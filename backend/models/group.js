// models/GroupRecommendationDetail.js

const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

/**
 * Grup öneri isteğine dair detayları tutar.
 * - Hangi kriterler ile öneri yapılmış
 * - Oluşturulan öneri playlist'inin ("Shelf") referansı
 * - İsteğin tamamlandığı/cevaplandığı tarih
 */

const groupSchema = new Schema(
  {
    // Öneri kriterleri (dynamic olarak saklanabilir)
    criteria: {
      type: Schema.Types.Mixed,
      required: true
      /**
       * Örneğin:
       * {
       *   genres: ["Action","Comedy"],
       *   minTmdbRating: 8.0,
       *   language: "en"
       * }
       */
    },
    groupMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    
    // Backend, bu kriterlere göre bir Shelf oluşturduğunda referans:
    shelfId: {
      type: Types.ObjectId,
      ref: "Shelf",
      default: null
    },
    // Talebin kabul edildiği/cevaplandığı tarih (analiz tamamlandığında atanır)
    respondedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = model(
  "Group",
  groupSchema
);
