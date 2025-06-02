// services/movieService.js

const Movie = require("../models/movie");
const { getFromCache, setToCache } = require("../utils/cache");
const axios = require("axios");
const { TMDB_API_KEY } = process.env;
// services/movieService.js
const { buildQueryOptions, buildCacheKeyFromQuery } = require("../utils/queryBuilder");


// 1) Örnek olarak bu alansal konfigürasyonu tanımlayın:
const movieFieldConfig = {
  movieId:    { type: "number", field: "movieId" },
  title:      { type: "string", field: "title", regex: true },
  genres:     { type: "array",  field: "genres" },
  minRuntime: { type: "number", field: "runtime", range: "gte" },
  maxRuntime: { type: "number", field: "runtime", range: "lte" },
  year:       { type: "string", field: "release_date", regex: true },
  language:   { type: "string", field: "original_language", regex: true },
  minRating:  { type: "number", field: "ratings.tmdb", range: "gte" },
  maxRating:  { type: "number", field: "ratings.tmdb", range: "lte" },
  directorId: { type: "number", field: "director" },
  writerId:   { type: "number", field: "writers" },
  actorId:    { type: "number", field: "cast" },
  keyword:    { type: "array",  field: "keywords" }
};

// 2) fetchMovies fonksiyonunu güncelleyin:
async function fetchMovies(queryParams) {
  // 0) Sayfa ve limit validasyonu: geçerli bir sayıya dönüştürülebiliyor mu kontrolü
  if (queryParams.page !== undefined && isNaN(Number(queryParams.page))) {
    return { invalidParam: "page" };
  }
  if (queryParams.limit !== undefined && isNaN(Number(queryParams.limit))) {
    return { invalidParam: "limit" };
  }

  // 1) Filtre, sıralama ve sayfalama bilgisini buildQueryOptions ile al
  const { filter, sort, pagination } = buildQueryOptions(movieFieldConfig, queryParams);
  const { page, limit, skip } = pagination; // pagination: { page, limit, skip }

  // 2) Cache anahtarı oluştur (queryParams + page + limit + sort)
  const cacheKey = buildCacheKeyFromQuery({ ...queryParams, page, limit, sort });

  // 3) Cache kontrolü
  const cachedData = await getFromCache(cacheKey);
  if (cachedData) {
    // Cache’ten geliyorsa fromCache: true
    return {
      fromCache: true,
      data: cachedData.data,
      pagination: cachedData.pagination
    };
  }

  // 4) Cache yoksa veritabanı sorgusu
  const totalDocs = await Movie.countDocuments(filter);
  const totalPages = Math.ceil(totalDocs / limit);

  const movies = await Movie.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select("movieId title images.poster ratings.tmdb");

  const paginationResult = {
    page,
    limit,
    total: totalDocs,
    totalPages
  };

  // 5) Cache’e yaz (TTL = 60 saniye)
  await setToCache(cacheKey, { data: movies, pagination: paginationResult }, 60);

  // 6) DB’den dönen veri
  return {
    fromCache: false,
    data: movies,
    pagination: paginationResult
  };
}

// 3) Geri kalan servis fonksiyonları (fetchMovieById, fetchPopularMovies, searchMovies) aynen kalabilir.

/**
 * Tek film detayı: cache + DB
 */
async function fetchMovieById(movieId) {
  const numericId = Number(movieId);
  const cacheKey = `movie:${numericId}`;

  // 1) Cache’ten kontrol
  const cachedMovie = await getFromCache(cacheKey);
  if (cachedMovie) {
    return { fromCache: true, data: cachedMovie };
  }

  // 2) DB’den çek
  const movie = await Movie.findOne({ movieId: numericId });
  if (!movie) {
    return { fromCache: false, data: null };
  }

  // 3) Cache’e yaz (TTL = 300s)
  await setToCache(cacheKey, movie, 300);
  return { fromCache: false, data: movie };
}

/**
 * Popüler filmler (TMDB API) + cache
 */
async function fetchPopularMovies() {
  const cacheKey = "popularMovies:page=1";

  // 1) Cache kontrol
  const cached = await getFromCache(cacheKey);
  if (cached) {
    return { fromCache: true, data: cached };
  }

  // 2) TMDB API çağrısı
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
  const response = await axios.get(url);
  const movies = response.data.results;

  // 3) Cache’e yaz (TTL = 60s)
  await setToCache(cacheKey, movies, 60);
  return { fromCache: false, data: movies };
}

/**
 * Full-text arama (sayfalı, pagination)
 */
async function searchMovies(query, page = 1, limit = 20) {
  const skip = (Number(page) - 1) * Number(limit);

  // MongoDB text search
  const movies = await Movie.find(
    { $text: { $search: query } },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .skip(skip)
    .limit(Number(limit))
    .select("movieId title overview images.poster ratings.tmdb");

  // Toplam eşleşme sayısını al
  const total = await Movie.countDocuments({ $text: { $search: query } });

  const paginationResult = {
    page: Number(page),
    limit: Number(limit),
    total,
    totalPages: Math.ceil(total / Number(limit))
  };

  return { fromCache: false, data: movies, pagination: paginationResult };
}

module.exports = {
  fetchMovies,
  fetchMovieById,
  fetchPopularMovies,
  searchMovies
};