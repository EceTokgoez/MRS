// models/Movie.js
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    movieId:          { type: Number, required: true, unique: true, index: true },
    title:            { type: String, required: true },
    genres:           [{ type: String }],
    overview:         String,
    runtime:          Number,
    release_date:     String,
    original_language:{ type: String },
    ratings: {
      tmdb: { type: Number },
      imdb: { type: Number }
    },
    cast:     [{ type: Number }],   // TMDB person IDs
    director: { type: Number },
    writers:  [{ type: Number }],
    keywords: [{ type: String }],
    images: {
      poster:   String,
      backdrop: String
    },
    external_ids: {
      tmdbId: { type: Number },
      imdbId: { type: String }
    },
    embedding: [{ type: Number }]
  },
  { timestamps: true }
);


movieSchema.index(
  {
    title:    "text",
    overview: "text",
    keywords: "text"
  },
  {
    weights: {
      title: 3,      // başlıktaki eşleşme daha yüksek skor alsın
      overview: 1,
      keywords: 2    // anahtar kelimeler orta derecede önemsensin
    },
    name: "MovieTextIndex" // İndeksin adı
  }
);


// ----------------------------------------------------
// DİĞER İNDEKSLER (daha önce eklemiştik)
// ----------------------------------------------------
movieSchema.index({ genres: 1 });
movieSchema.index({ release_date: 1 });
movieSchema.index({ original_language: 1 });
movieSchema.index({ "ratings.tmdb": 1 });
movieSchema.index({ director: 1 });
movieSchema.index({ writers: 1 });
movieSchema.index({ cast: 1 });
movieSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Movie", movieSchema);
