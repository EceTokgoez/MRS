// models/Shelf.js

const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

// ------------------------------
// Grant (İzin) Alt Şeması
// ------------------------------
const GrantSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true
    },
    // Hangi izne sahip (read veya write).
    permission: {
      type: String,
      enum: ["read", "write"],
      default: "read"
    }
  },
  { _id: false }
);

// ------------------------------
// Ana Shelf (Raf / Liste) Şeması
// ------------------------------
const ShelfSchema = new Schema(
  {
    // ---------------------
    // 1. Temel Bilgiler
    // ---------------------

    // Liste başlığı (ör. "Favori Aksiyon Filmlerim").
    name: {
      type: String,
      required: true,
      trim: true
    },

    // Liste açıklaması (opsiyonel).
    description: {
      type: String,
      default: ""
    },

    // ---------------------
    // 2. Sahiplik / Grant Yapısı
    // ---------------------

    // Liste sahipleri (owners). Bir veya birden çok User ObjectId.
    owners: [
      {
        type: Types.ObjectId,
        ref: "User"
      }
    ],
    // owners boş kalabilir (AI, builtin listelerde).

    // Başka kullanıcı(lar)a atanmış izinler (read / write).
    grants: {
      type: [GrantSchema],
      default: []
    },

    // ---------------------
    // 3. Görünürlük (Visibility)
    // ---------------------

    // public / friends / private
    visibility: {
      type: String,
      enum: ["private", "friends", "public"],
      default: "private"
    },

    // ---------------------
    // 4. Liste Türü (Type) ve Kategori
    // ---------------------

    listType: {
      type: String,
      enum: ["user", "shared", "ai", "builtin"],
      required: true,
      default: "user"
    },

    // listType = "builtin" ise kategori burada saklanır.
    category: {
      type: String,
      default: ""
    },

    // AI tarafından oluşturulan listeler için parametreler (prompt, model, benzerlik eşiği, vb.).
    aiParams: {
      type: Schema.Types.Mixed,
      default: null
    },

    // ---------------------
    // 5. Film Listesi (filmIds)
    // ---------------------

    // filmIds: Movie koleksiyonundaki movieId (Number) değerleri.
    filmIds: {
      type: [Number],
      default: []
    },
    // Alternatif olarak ObjectId referans isterseniz:
    // filmIds: [{ type: Types.ObjectId, ref: "Movie" }],

    // ---------------------
    // 6. ChromaDB / Benzerlik Bilgisi
    // ---------------------

    // ChromaDB v.b. embedding veritabanında bu liste için kullanılan koleksiyon ID’si.
    chromaCollectionId: {
      type: String,
      default: null
    },

    // ---------------------
    // 7. Meta Bilgiler
    // ---------------------

    // Bu listeyi ilk oluşturan “birincil” kullanıcı.
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true
    },

    // Listenin kaç adet film içerdiğini önbelleğe almak üzere
    // filmIds.length yerine doğrudan saklanan alan.
    itemCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true // createdAt ve updatedAt alanları otomatik eklensin
  }
);

// ------------------------------
// Pre-save Hook: itemCount Güncelleme
// ------------------------------
ShelfSchema.pre("save", function (next) {
  this.itemCount = Array.isArray(this.filmIds) ? this.filmIds.length : 0;
  next();
});

// ------------------------------
// İNDEKSLER (Index Definitions)
// ------------------------------

// 1) "name" ve "description" üzerinde metin (text) araması için compound text index.
//    Bu sayede kullanıcı liste başlığı veya açıklamada kelime arayabilir.
ShelfSchema.index(
  { name: "text", description: "text" },
  {
    weights: {
      name: 5,        // başlıkta eşleşme daha yüksek öncelikli
      description: 1  // açıklamada daha düşük öncelikli
    },
    name: "ShelfTextIndex"
  }
);

// 2) "createdBy" alanı üzerinde index.
//    Kullanıcıya ait tüm listeleri hızlıca çekmek için.
ShelfSchema.index({ createdBy: 1 });

// 3) "owners" alanı üzerinde index.
//    Birden fazla sahip olması durumunda da, üye olduğu listeleri çekmek için.
ShelfSchema.index({ owners: 1 });

// 4) "grants.user" alanı üzerinde index.
//    Belli bir kullanıcıya atanan izinleri kontrol etmek ve listeleri sorgulamak için.
ShelfSchema.index({ "grants.user": 1 });

// 5) "visibility" + "listType" kombinasyonu için compound index.
//    Örneğin public builtin listeleri hızlıca çekmek veya public/ai gibi gruplamaları sorgulamak için.
ShelfSchema.index({ visibility: 1, listType: 1 });

// 6) "category" alanı üzerinde index.
//    Built-in veya kategoriye göre listeleri hızlıca filtrelemek için.
ShelfSchema.index({ category: 1 });

// 7) "filmIds" alanı üzerinde multikey index.
//    Belirli bir filmId’ye sahip tüm listeleri bulmak için (örneğin movieId = 1234 olan listeler).
ShelfSchema.index({ filmIds: 1 });

// 8) "createdAt" ve "updatedAt" üzerinde index.
//    Yeni oluşturulan veya güncellenen listeleri sıralamak / filtrelemek için.
ShelfSchema.index({ createdAt: -1 });
ShelfSchema.index({ updatedAt: -1 });

// 9) "visibility" + "owners" kombinasyonu için compound index.
//    Örneğin, private listeleri sadece sahiplerine göre sorgularken kullanışlı.
ShelfSchema.index({ visibility: 1, owners: 1 });

// ------------------------------
// Model Export
// ------------------------------
module.exports = model("Shelf", ShelfSchema);
