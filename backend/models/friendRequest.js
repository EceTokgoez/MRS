// models/FriendRequestDetail.js

const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

/**
 * Arkadaşlık isteğine dair detayları tutar.
 * - İsteğe eklenen mesaj
 * - İstek kabul/ret zamanı
 */

const friendRequestSchema = new Schema(
  {
    // Arkadaşlık isteğine yazılan kısa not/metin
    message: {
      type: String,
      default: ""
    },
    // Eğer isteği alan “accept” ederse bu alana tarih atılır (otomatik eklenebilir)
    respondedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = model("FriendRequest", friendRequestSchema);
