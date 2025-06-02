// controllers/movieController.js

const asyncHandler = require("express-async-handler");
const movieService = require("../services/movieService");

/**
 * GET /api/movies
 */
const getMovies = asyncHandler(async (req, res) => {
  // 1) Service katmanındaki fetchMovies’i çağır
  const result = await movieService.fetchMovies(req.query);

  // 2) Eğer invalidParam işareti varsa 400 Bad Request dön
  if (result.invalidParam) {
    res.status(400);
    throw new Error(`${result.invalidParam} parametresi geçerli bir sayı olmalı.`);
  }

  // 3) Eğer cache’ten geldiyse cached: true olarak dön
  if (result.fromCache) {
    return res.status(200).json({
      success: true,
      message: "Movies fetched from cache",
      data: result.data,
      pagination: result.pagination,
      cached: true
    });
  }

  // 4) DB’den geliyorsa normal yanıt
  return res.status(200).json({
    success: true,
    message: "Movies fetched successfully from DB",
    data: result.data,
    pagination: result.pagination
  });
});

/**
 * GET /api/movies/:movieId
 */
const getMovieById = asyncHandler(async (req, res) => {
  const movieId = req.params.movieId;
  const result = await movieService.fetchMovieById(movieId);

  if (result.fromCache) {
    return res.status(200).json({
      success: true,
      message: "Movie fetched by ID from cache",
      data: result.data,
      cached: true
    });
  }

  if (!result.data) {
    // Film DB’de yoksa
    res.status(404);
    throw new Error("Movie not found");
  }

  return res.status(200).json({
    success: true,
    message: "Movie fetched successfully from DB",
    data: result.data
  });
});

/**
 * GET /api/movies/popular
 */
const getPopularMovies = asyncHandler(async (req, res) => {
  const result = await movieService.fetchPopularMovies();

  if (result.fromCache) {
    return res.status(200).json({
      success: true,
      message: "Popular movies fetched from cache",
      data: result.data,
      cached: true
    });
  }

  return res.status(200).json({
    success: true,
    message: "Popular movies fetched successfully from TMDB",
    data: result.data
  });
});

/**
 * GET /api/movies/search?query=...&page=...&limit=...
 */
const searchMovies = asyncHandler(async (req, res) => {
  const { query, page = 1, limit = 20 } = req.query;

  if (!query) {
    res.status(400);
    throw new Error("Search query parameter 'query' is required.");
  }

  const result = await movieService.searchMovies(query, page, limit);

  return res.status(200).json({
    success: true,
    message: "Movie search results",
    data: result.data,
    pagination: result.pagination
  });
});

module.exports = {
  getMovies,
  getMovieById,
  getPopularMovies,
  searchMovies
};
