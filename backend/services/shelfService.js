// services/shelfService.js

const { Types } = require("mongoose");
const Shelf = require("../models/shelf");
const { getFromCache, setToCache, getRedisClient } = require("../utils/cache");
const { buildQueryOptions, buildCacheKeyFromQuery } = require("../utils/queryBuilder");

/**
 * fieldConfig şeması:
 * Her bir sorgu parametresi, Shelf modelinin hangi alanına karşılık geliyor,
 * hangi tip/işlem biçimi (regex, array, vs.) kullanılacak gösterir.
 */
const shelfFieldConfig = {
  name: {
    type: "string",
    field: "name",
    regex: true
  },
  category: {
    type: "string",
    field: "category",
    regex: true
  },
  listType: {
    type: "string",
    field: "listType"
  },
  visibility: {
    type: "string",
    field: "visibility"
  },
  createdBy: {
    type: "string",
    field: "createdBy"
  },
  ownerId: {
    type: "array",
    field: "owners"
  },
  filmId: {
    type: "number",
    field: "filmIds"
  }
};

/**
 * 1) Listeleme (sayfalama + filtre + sıralama + cache)
 *
 * @param {Object} queryParams  – Express’in req.query objesi
 * @returns {Object}            – {
 *                                  invalidParam?: "page" | "limit",
 *                                  fromCache?: boolean,
 *                                  data: [Shelf],
 *                                  pagination: { page, limit, total, totalPages }
 *                                }
 */
async function fetchShelves(queryParams) {
  // 1.a) “page” / “limit” validasyonu
  if (queryParams.page !== undefined && isNaN(Number(queryParams.page))) {
    return { invalidParam: "page" };
  }
  if (queryParams.limit !== undefined && isNaN(Number(queryParams.limit))) {
    return { invalidParam: "limit" };
  }

  // 1.b) Filtre, sıralama, pagination bilgisi oluştur
  const { filter, sort, pagination } = buildQueryOptions(shelfFieldConfig, queryParams);
  const { page, limit, skip } = pagination;

  // 1.c) Cache anahtarını yarat
  const cacheKey = buildCacheKeyFromQuery({ ...queryParams, page, limit, sort });

  // 1.d) Cache kontrolü
  const cachedData = await getFromCache(cacheKey);
  if (cachedData) {
    return {
      fromCache: true,
      data: cachedData.data,
      pagination: cachedData.pagination
    };
  }

  // 1.e) Cache’te yoksa DB’den sorgu
  const totalDocs = await Shelf.countDocuments(filter);
  const totalPages = Math.ceil(totalDocs / limit);

  const shelves = await Shelf.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean(); // lean() ile sade JSON objesi döner

  const paginationResult = {
    page,
    limit,
    total: totalDocs,
    totalPages
  };

  // 1.f) Cache’e yaz (TTL = 60 saniye)
  await setToCache(cacheKey, { data: shelves, pagination: paginationResult }, 60);

  return {
    fromCache: false,
    data: shelves,
    pagination: paginationResult
  };
}

/**
 * 2) Tek bir Shelf getirme (ID ile) + cache
 *
 * @param {String} shelfId  – Parametre olarak gelen Shelf ObjectId string
 * @returns {Object}        – {
 *                              invalidParam?: true,   // shelfId geçerli ObjectId değilse
 *                              fromCache?: boolean,
 *                              data: Shelf | null
 *                            }
 */
async function fetchShelfById(shelfId) {
  // 2.a) ObjectId validasyonu
  if (!Types.ObjectId.isValid(shelfId)) {
    return { invalidParam: true };
  }

  const cacheKey = `shelf:${shelfId}`;

  // 2.b) Cache kontrolü
  const cached = await getFromCache(cacheKey);
  if (cached) {
    return {
      fromCache: true,
      data: cached
    };
  }

  // 2.c) DB’den çek
  const shelf = await Shelf.findById(shelfId).lean();
  if (!shelf) {
    return {
      fromCache: false,
      data: null
    };
  }

  // 2.d) Cache’e yaz (TTL = 300 saniye)
  await setToCache(cacheKey, shelf, 300);

  return {
    fromCache: false,
    data: shelf
  };
}

/**
 * 3) Yeni Shelf oluşturma
 *
 * @param {Object} payload  – {
 *                            name,
 *                            description?,
 *                            listType?,
 *                            category?,
 *                            aiParams?,
 *                            visibility?,
 *                            owners? (array of ObjectId strings),
 *                            createdBy (ObjectId string)
 *                          }
 * @returns {Object}        – Oluşturulan Shelf objesi
 */
async function createShelf(payload) {
  // 3.a) itemCount otomatik olarak pre-save hook’ta ayarlanacaktır.
  const newShelf = new Shelf({
    name: payload.name,
    description: payload.description || "",
    listType: payload.listType || "user",
    category: payload.category || "",
    aiParams: payload.aiParams || null,
    visibility: payload.visibility || "private",
    owners: Array.isArray(payload.owners) ? payload.owners : [payload.createdBy],
    grants: [], // Oluşum aşamasında henüz grant yok
    filmIds: [], // Oluşum aşamasında boş
    chromaCollectionId: payload.chromaCollectionId || null,
    createdBy: payload.createdBy
  });

  const saved = await newShelf.save();
  // Yeni eklenen shelf’i cache’e yazmıyoruz (listeleme cache’leri düşürülebilir).
  return saved.toObject();
}

/**
 * 4) Shelf güncelleme (sahip veya write izni olan)
 *
 * @param {String} shelfId
 * @param {Object} updates   – {
 *                             name?,
 *                             description?,
 *                             visibility?,
 *                             category?,
 *                             listType?,
 *                             aiParams?,
 *                             owners?,      // array of ObjectId string
 *                             grants?,      // array of { user, permission }
 *                             chromaCollectionId?
 *                           }
 * @returns {Object}         – Güncellenmiş Shelf objesi veya null
 */
async function updateShelf(shelfId, updates) {
  // 4.a) shelfId validasyonu
  if (!Types.ObjectId.isValid(shelfId)) {
    return { invalidParam: true };
  }

  // 4.b) Güncellenecek alanları belirleyelim
  const allowedFields = [
    "name",
    "description",
    "visibility",
    "category",
    "listType",
    "aiParams",
    "owners",
    "grants",
    "chromaCollectionId"
  ];
  const payload = {};
  Object.keys(updates).forEach((key) => {
    if (allowedFields.includes(key)) {
      payload[key] = updates[key];
    }
  });

  // 4.c) Veritabanında güncelle ve güncel objeyi döndür
  const updated = await Shelf.findByIdAndUpdate(
    shelfId,
    { $set: payload },
    { new: true, runValidators: true, lean: true }
  );
  if (!updated) {
    return { data: null };
  }

  // 4.d) Cache’i geçersiz kıl (sil veya güncelle)
  const cacheKey = `shelf:${shelfId}`;
  await getFromCache(cacheKey).then((cached) => {
    if (cached) {
      // Basitçe cache’i silmek en güvenli yöntem:
      getFromCache(cacheKey).then(() => {
        // Redis client üzerinden direkt silme:
        getFromCache.cacheClient && getFromCache.cacheClient.del(cacheKey);
      });
    }
  });

  return updated;
}

/**
 * 5) Shelf silme (sahip veya write izni olan)
 *
 * @param {String} shelfId
 * @returns {Boolean} – true => silindi; false => silinemedi (bulunamadı)
 */
async function deleteShelf(shelfId) {
  if (!Types.ObjectId.isValid(shelfId)) {
    return { invalidParam: true };
  }

  const deleted = await Shelf.findByIdAndDelete(shelfId).lean();
  if (!deleted) {
    return { data: false };
  }

  // Cache’i temizle
  const cacheKey = `shelf:${shelfId}`;
  getFromCache.cacheClient && getFromCache.cacheClient.del(cacheKey);

  return { data: true };
}

/**
 * 6) Bir filme Shelf’e ekleme (write izni kontrolü controller’da yapılmalı)
 *
 * @param {String} shelfId
 * @param {Number} movieId
 * @returns {Object} – Güncellenmiş Shelf objesi veya null
 */
async function addFilmToShelf(shelfId, movieId) {
  if (!Types.ObjectId.isValid(shelfId)) {
    return { invalidParam: true };
  }

  // 6.a) Film zaten ekli mi kontrol etmeden $addToSet kullanacağız
  const updated = await Shelf.findByIdAndUpdate(
    shelfId,
    { $addToSet: { filmIds: movieId } },
    { new: true, runValidators: true, lean: true }
  );
  if (!updated) {
    return { data: null };
  }

  // 6.b) Cache’i temizle (yeni film eklendiği için geçerli değil)
  const cacheKey = `shelf:${shelfId}`;
  getFromCache.cacheClient && getFromCache.cacheClient.del(cacheKey);

  return updated;
}

/**
 * 7) Bir film Shelf’ten çıkarma (write izni kontrolü controller’da yapılmalı)
 *
 * @param {String} shelfId
 * @param {Number} movieId
 * @returns {Object} – Güncellenmiş Shelf objesi veya null
 */
async function removeFilmFromShelf(shelfId, movieId) {
  if (!Types.ObjectId.isValid(shelfId)) {
    return { invalidParam: true };
  }

  const updated = await Shelf.findByIdAndUpdate(
    shelfId,
    { $pull: { filmIds: movieId } },
    { new: true, runValidators: true, lean: true }
  );
  if (!updated) {
    return { data: null };
  }

  // Cache’i temizle
  const cacheKey = `shelf:${shelfId}`;
  getFromCache.cacheClient && getFromCache.cacheClient.del(cacheKey);

  return updated;
}

/**
 * 8) Named full-text arama (name + description) + pagination
 *     - Mongoose text index’e dayanır.
 *
 * @param {String} searchText
 * @param {Number} page
 * @param {Number} limit
 * @returns {Object} – { data: [Shelf], pagination: { page, limit, total, totalPages } }
 */
async function searchShelves(searchText, page = 1, limit = 20) {
  // 8.a) Parametre validasyonu
  const numericPage = Number(page);
  const numericLimit = Number(limit);
  if (isNaN(numericPage) || isNaN(numericLimit)) {
    return { invalidParam: true };
  }

  const skip = (numericPage - 1) * numericLimit;

  // 8.b) Text search sorgusu
  const query = { $text: { $search: searchText } };
  const projection = { score: { $meta: "textScore" } };

  const shelves = await Shelf.find(query, projection)
    .sort({ score: { $meta: "textScore" } })
    .skip(skip)
    .limit(numericLimit)
    .lean();

  const total = await Shelf.countDocuments(query);
  const paginationResult = {
    page: numericPage,
    limit: numericLimit,
    total,
    totalPages: Math.ceil(total / numericLimit)
  };

  return { data: shelves, pagination: paginationResult };
}


/**
 * İçeride kullanılacak hata fırlatma yardımcı fonksiyonu.
 * message: hata mesajı, statusCode: HTTP status kodu.
 */
function throwError(message, statusCode = 400) {
  const err = new Error(message);
  err.statusCode = statusCode;
  throw err;
}

/**
 * Sahip kontrolü: shelfId’ye ait Shelf dokümanını bulup,
 * currentUserId’nin owners içinde olup olmadığını kontrol eder.
 * Bulamazsa veya user suf’ta değilse uygun hata atar.
 *
 * @param {String} shelfId        – Shelf ObjectId string
 * @param {String} currentUserId  – Şu anda oturum açmış (isteği yapan) kullanıcı ID’si
 * @returns {Object}              – Shelf dokümanı (lean() olmadan tam Mongoose objesi)
 */
async function verifyOwnershipOrThrow(shelfId, currentUserId) {
  if (!Types.ObjectId.isValid(shelfId)) {
    throwError("Geçersiz Shelf ID.", 400);
  }
  const shelf = await Shelf.findById(shelfId);
  if (!shelf) {
    throwError("Shelf bulunamadı.", 404);
  }
  const isOwner = Array.isArray(shelf.owners) && shelf.owners.some(o => o.toString() === currentUserId);
  if (!isOwner) {
    throwError("Bu işlemi yapmaya yetkiniz yok. Sahip (owner) değilsiniz.", 401);
  }
  return shelf; // tam Mongoose objesi, save() vb. işlemler için
}

/**
 * 1) Grant Verme veya Güncelleme (Add/Update Grant)
 *
 * @param {String} currentUserId   – İşlemi yapan (authenticated) kullanıcı ID
 * @param {String} shelfId         – Hedef Shelf ID
 * @param {String} targetUserId    – İzin verilecek kullanıcı ID
 * @param {String} permission      – "read" veya "write"
 * @returns {Object}               – Güncel Shelf objesi (lean() yerine Mongoose objesi dönebilir)
 */
async function addOrUpdateGrant(currentUserId, shelfId, targetUserId, permission) {
  // 1.a) Sahip kontrolü
  const shelf = await verifyOwnershipOrThrow(shelfId, currentUserId);

  // 1.b) targetUserId validasyonu
  if (!Types.ObjectId.isValid(targetUserId)) {
    throwError("Geçersiz targetUserId.", 400);
  }
  // 1.c) permission kontrolü
  if (!["read", "write"].includes(permission)) {
    throwError("permission yalnızca 'read' veya 'write' olabilir.", 400);
  }

  // 1.d) Zaten grants içinde var mı?
  const existingIndex = shelf.grants.findIndex(g => g.user.toString() === targetUserId);
  if (existingIndex !== -1) {
    // Var ise sadece permission güncelle
    shelf.grants[existingIndex].permission = permission;
  } else {
    // Yoksa yeni grant objesini diziye ekle
    shelf.grants.push({
      user: Types.ObjectId(targetUserId),
      permission
    });
  }

  // 1.e) Kaydet ve güncel objeyi al
  const updatedShelf = await shelf.save();

  // 1.f) Cache geçersiz kıl
  const cacheKey = `shelf:${shelfId}`;
  try {
    const redisClient = await getRedisClient();
    await redisClient.del(cacheKey);
  } catch {
    // Cache temizleme hatası uygulamayı durdurmasın
  }

  return updatedShelf.toObject();
}

/**
 * 2) Grant Kaldırma (Remove Grant)
 *
 * @param {String} currentUserId   – İşlemi yapan (authenticated) kullanıcı ID
 * @param {String} shelfId         – Hedef Shelf ID
 * @param {String} targetUserId    – İzin kaldırılacak kullanıcı ID
 * @returns {Object}               – Güncel Shelf objesi
 */
async function removeGrant(currentUserId, shelfId, targetUserId) {
  // 2.a) Sahip kontrolü
  const shelf = await verifyOwnershipOrThrow(shelfId, currentUserId);

  // 2.b) targetUserId validasyonu
  if (!Types.ObjectId.isValid(targetUserId)) {
    throwError("Geçersiz targetUserId.", 400);
  }

  // 2.c) grants dizisinden bu kullanıcıyı çıkar
  const originalLength = shelf.grants.length;
  shelf.grants = shelf.grants.filter(g => g.user.toString() !== targetUserId);

  if (shelf.grants.length === originalLength) {
    // Yani hiçbir şey değişmedi, targetUserId bulunamadı
    throwError("Bu kullanıcı için daha önceden atanmış grant bulunamadı.", 404);
  }

  // 2.d) Kaydet ve güncel objeyi al
  const updatedShelf = await shelf.save();

  // 2.e) Cache geçersiz kıl
  const cacheKey = `shelf:${shelfId}`;
  try {
    const redisClient = await getRedisClient();
    await redisClient.del(cacheKey);
  } catch {
    // Devam et
  }

  return updatedShelf.toObject();
}

module.exports = {
  fetchShelves,
  fetchShelfById,
  createShelf,
  updateShelf,
  deleteShelf,
  addFilmToShelf,
  removeFilmFromShelf,
  searchShelves,
  addOrUpdateGrant,
  removeGrant
};
