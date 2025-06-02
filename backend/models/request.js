// models/Request.js

const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const requestSchema = new Schema(
  {
    // --------------------------------
    // 1. Ortak Alanlar
    // --------------------------------

    // Talebin türü
    type: {
      type: String,
      required: true,
      enum: [
        "harMovie",
        "sharedPlaylistAccess",
        "friendRequest",
        "groupRecommendation"
      ],
      index: true
    },

    // İsteği gönderen kullanıcı ID
    from: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    // Talebin hedefi: çoğu tip için bir kullanıcı ID’si
    // (groupRecommendation dışındakiler “to”ya bir User ID yazar)
    to: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
      index: true
    },

    // İsteğin mevcut durumu: pending / accepted / declined / cancelled
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "cancelled"],
      default: "pending",
      index: true
    },

    // --------------------------------
    // 2. Detail Referansları
    // --------------------------------
    // Hangi tip ise, ilgili “Detail” koleksiyonundaki kayda referans taşınır.
    // Diğer tipler için bu alanlar null kalır.

    // 2.a. harMovieDetail referans
    harMovie: {
      type: Types.ObjectId,
      ref: "HarMovie",
      default: null,
      index: true
    },

    // 2.b. sharedPlaylistAccessDetail referans
    sharedPlaylist: {
      type: Types.ObjectId,
      ref: "SharedPlaylist",
      default: null,
      index: true
    },

    // 2.c. friendRequestDetail referans
    friendRequest: {
      type: Types.ObjectId,
      ref: "FriendRequest",
      default: null,
      index: true
    },

    // 2.d. groupRecommendationDetail referans
    groupRecommendation: {
      type: Types.ObjectId,
      ref: "GroupRecommendation",
      default: null,
      index: true
    }
  },
  {
    timestamps: true // createdAt, updatedAt alanları otomatik
  }
);

// --------------------------------
// 3. İNDEKSLER
// --------------------------------

// type + status → belli tip ve durumdaki istekleri hızlıca bulmak için
requestSchema.index({ type: 1, status: 1 });

// from + type → bir kullanıcının gönderdiği belli tipteki istekleri sorgu hızlandırma
requestSchema.index({ from: 1, type: 1 });

// to + type + status → bir kullanıcıya gelen pending istekleri filtreleme (örn. bekleyen arkadaşlık istekleri)
requestSchema.index({ to: 1, type: 1, status: 1 });

// Detail referans indeksleri (opsiyonel ama sorgu bazlı yararlı olabilir)
requestSchema.index({ harMovie: 1 });
requestSchema.index({ sharedPlaylist: 1 });
requestSchema.index({ friendRequest: 1 });
requestSchema.index({ groupRecommendation: 1 });

// createdAt ve updatedAt
requestSchema.index({ createdAt: -1 });
requestSchema.index({ updatedAt: -1 });

module.exports = model("Request", requestSchema);