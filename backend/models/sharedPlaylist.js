// models/SharedPlaylistAccessDetail.js

const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

/**
 * Ortak playlist (Shelf) erişim isteğine dair detayları tutar.
 * - Hangi izin (read / write) talep edilmiş
 * - İstek kabul edildiğinde verilecek iznin netleştiği tarih vb.
 */

const sharedPlaylistSchema = new Schema(
  {
    // Hangi permission istendi: "read" veya "write"
    requestedPermission: {
      type: String,
      enum: ["read", "write"],
      default: "read"
    },
    // İstek kabul edildiğinde (approve) verilecek izin; örneğin "read" ya da "write"
    grantedPermission: {
      type: String,
      enum: ["read", "write"],
      default: null
    },
    // Talebin kabul edildiği zaman
    respondedAt: {
      type: Date,
      default: null
    },
    shelfId: {
      type: Types.ObjectId,
      ref: "Shelf",
      required: true,
      index: true
    },
  },
  { timestamps: true }
);

module.exports = model(
  "SharedPlaylist",
  sharedPlaylistSchema
);