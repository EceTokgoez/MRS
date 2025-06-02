// models/HarMovieDetail.js

const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

/**
 * İki kullanıcı arasındaki film uyum analizine dair detayları tutar.
 * - kullanıcılar arası skor
 * - analiz için gerekliyse loglar, film/vazgeçme verileri vb.
 */

const harMovieSchema = new Schema(
  {
    // İki kullanıcı arasındaki uyum hesaplanan değer (örneğin 0.0–1.0 arası)
    compatibilityScore: {
      type: Number,
      required: true
    },
    // Analiz sonuçlarına göre oluşturulan ortak oynatma listesi
    // (“Shelf” modeline referans)
    shelfId: {
      type: Types.ObjectId,
      ref: "Shelf",
      default: null
    },
    // Analiz raporu veya ek metrikleri JSON olarak saklamak isterseniz:
    analytics: {
      type: Schema.Types.Mixed,
      default: {}
      /**
       * Örnek içerik:
       * {
       *   commonMoviesCount: 23,
       *   uncommonMoviesCount: 10,
       *   similarityPercentage: 82.5,
       *   detailedScores: { movieA: 4.5, movieB: 3.8, ... }
       * }
       */
    }
  },
  { timestamps: true }
);

module.exports = model("HarMovie", harMovieSchema);
