// controllers/shelfController.js

const asyncHandler = require("express-async-handler");
const shelfService = require("../services/shelfService");

// 1) GET /api/v1/shelves → Listeleme
const getShelves = asyncHandler(async (req, res) => {
  const result = await shelfService.fetchShelves(req.query);

  if (result.invalidParam) {
    res.status(400);
    throw new Error(`${result.invalidParam} parametresi geçerli bir sayı olmalı.`);
  }

  if (result.fromCache) {
    return res.status(200).json({
      success: true,
      message: "Shelves fetched from cache",
      data: result.data,
      pagination: result.pagination,
      cached: true
    });
  }

  return res.status(200).json({
    success: true,
    message: "Shelves fetched successfully from DB",
    data: result.data,
    pagination: result.pagination
  });
});

// 2) GET /api/v1/shelves/:id → Tek bir shelf
const getShelfById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await shelfService.fetchShelfById(id);

  if (result.invalidParam) {
    res.status(400);
    throw new Error("Geçersiz Shelf ID.");
  }
  if (!result.data) {
    res.status(404);
    throw new Error("Shelf bulunamadı.");
  }
  if (result.fromCache) {
    return res.status(200).json({
      success: true,
      message: "Shelf fetched from cache",
      data: result.data,
      cached: true
    });
  }
  return res.status(200).json({
    success: true,
    message: "Shelf fetched from DB",
    data: result.data
  });
});

// 3) POST /api/v1/shelves → Yeni shelf oluşturma
const createShelf = asyncHandler(async (req, res) => {
  // req.user.id → Authenticated kullanıcı ID’si
  const payload = {
    name: req.body.name,
    description: req.body.description,
    listType: req.body.listType,
    category: req.body.category,
    aiParams: req.body.aiParams,
    visibility: req.body.visibility,
    owners: req.body.owners, // opsiyonel, yoksa createdBy tek sahip
    chromaCollectionId: req.body.chromaCollectionId,
    createdBy: req.user.id
  };

  const newShelf = await shelfService.createShelf(payload);
  return res.status(201).json({
    success: true,
    message: "Shelf created successfully",
    data: newShelf
  });
});

// 4) PUT /api/v1/shelves/:id → Shelf güncelleme
const updateShelf = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // Burada mutlaka “owner” veya “write izni” kontrolü yapılmalı.
  // Örneğin:
  // if (!req.user.id.equals(shelf.createdBy) && !shelf.grants.includes({ user: req.user.id, permission: 'write' })) throw 403.

  const result = await shelfService.updateShelf(id, req.body);
  if (result.invalidParam) {
    res.status(400);
    throw new Error("Geçersiz Shelf ID.");
  }
  if (result.data === null) {
    res.status(404);
    throw new Error("Shelf bulunamadı.");
  }
  return res.status(200).json({
    success: true,
    message: "Shelf updated successfully",
    data: result
  });
});

// 5) DELETE /api/v1/shelves/:id → Shelf silme
const deleteShelf = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // “owner” veya “write” izni kontrolü yapılmalı.

  const result = await shelfService.deleteShelf(id);
  if (result.invalidParam) {
    res.status(400);
    throw new Error("Geçersiz Shelf ID.");
  }
  if (!result.data) {
    res.status(404);
    throw new Error("Shelf bulunamadı.");
  }
  return res.status(200).json({
    success: true,
    message: "Shelf deleted successfully"
  });
});

// 6) POST /api/v1/shelves/:id/films → Film ekleme
const addFilm = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movieId = Number(req.body.movieId);
  if (isNaN(movieId)) {
    res.status(400);
    throw new Error("Geçersiz movieId.");
  }
  // “write” izni kontrolü yapılmalı

  const updated = await shelfService.addFilmToShelf(id, movieId);
  if (updated.invalidParam) {
    res.status(400);
    throw new Error("Geçersiz Shelf ID.");
  }
  if (!updated.data) {
    res.status(404);
    throw new Error("Shelf bulunamadı.");
  }
  return res.status(200).json({
    success: true,
    message: "Film shelf’e eklendi",
    data: updated
  });
});

// 7) DELETE /api/v1/shelves/:id/films/:movieId → Film çıkarma
const removeFilm = asyncHandler(async (req, res) => {
  const { id, movieId } = req.params;
  const numericMovieId = Number(movieId);
  if (isNaN(numericMovieId)) {
    res.status(400);
    throw new Error("Geçersiz movieId.");
  }
  // “write” izni kontrolü yapılmalı

  const updated = await shelfService.removeFilmFromShelf(id, numericMovieId);
  if (updated.invalidParam) {
    res.status(400);
    throw new Error("Geçersiz Shelf ID.");
  }
  if (!updated.data) {
    res.status(404);
    throw new Error("Shelf bulunamadı.");
  }
  return res.status(200).json({
    success: true,
    message: "Film shelf’ten çıkarıldı",
    data: updated
  });
});

// 8) GET /api/v1/shelves/search?q=...&page=...&limit=... → Full‐text arama
const searchShelves = asyncHandler(async (req, res) => {
  const { q, page = 1, limit = 20 } = req.query;
  if (!q) {
    res.status(400);
    throw new Error("Arama parametresi (q) gerekli.");
  }
  const result = await shelfService.searchShelves(q, page, limit);
  if (result.invalidParam) {
    res.status(400);
    throw new Error("Geçersiz pagination parametresi.");
  }
  return res.status(200).json({
    success: true,
    message: "Shelf search results",
    data: result.data,
    pagination: result.pagination
  });
});



const addOrUpdateGrant = asyncHandler(async (req, res) => {
  const currentUserId = req.user.id;
  const shelfId = req.params.id;
  const { userId: targetUserId, permission } = req.body;

  // Parametre kontrollleri
  if (!targetUserId || !permission) {
    res.status(400);
    throw new Error("userId ve permission alanları gereklidir.");
  }

  // Servisi çağır
  const updatedShelf = await shelfService.addOrUpdateGrant(currentUserId, shelfId, targetUserId, permission);

  // Başarılıysa döndür
  res.status(200).json({
    success: true,
    message: `Kullanıcıya '${permission}' izni başarıyla atandı.`,
    data: updatedShelf
  });
});

/**
 * Grant kaldırma endpoint’i:
 * DELETE /api/v1/shelves/:id/grants/:userId
 */
const removeGrant = asyncHandler(async (req, res) => {
  const currentUserId = req.user.id;
  const shelfId = req.params.id;
  const targetUserId = req.params.userId;

  // Parametre validasyonu
  if (!targetUserId) {
    res.status(400);
    throw new Error("userId parametresi gereklidir.");
  }

  // Servisi çağır
  const updatedShelf = await shelfService.removeGrant(currentUserId, shelfId, targetUserId);

  // Başarılıysa döndür
  res.status(200).json({
    success: true,
    message: "Kullanıcının izni başarıyla kaldırıldı.",
    data: updatedShelf
  });
});


module.exports = {
  getShelves,
  getShelfById,
  createShelf,
  updateShelf,
  deleteShelf,
  addFilm,
  removeFilm,
  searchShelves,
  addOrUpdateGrant,
  removeGrant
};
