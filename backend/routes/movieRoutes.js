// routes/movieRoutes.js

const express = require("express");
const router = express.Router();
const {
  getMovies,
  getMovieById,
  getPopularMovies,
  searchMovies
} = require("../controllers/movieController");

// GET /api/movies
router.get("/", getMovies);

// GET /api/movies/search?query=...&page=...&limit=...
router.get("/search", searchMovies);

// GET /api/movies/popular
router.get("/popular", getPopularMovies);

// GET /api/movies/:movieId
router.get("/:movieId", getMovieById);

module.exports = router;
