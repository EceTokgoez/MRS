// utils/queryBuilder.js

/**
 * Örnek fieldConfig şeması:
 * 
 * const movieFieldConfig = {
 *   movieId:    { type: "number", field: "movieId" },
 *   title:      { type: "string", field: "title", regex: true },
 *   genres:     { type: "array",  field: "genres" },
 *   minRuntime: { type: "number", field: "runtime", range: "gte" },
 *   maxRuntime: { type: "number", field: "runtime", range: "lte" },
 *   year:       { type: "string", field: "release_date", regex: true },
 *   language:   { type: "string", field: "original_language", regex: true },
 *   minRating:  { type: "number", field: "ratings.tmdb", range: "gte" },
 *   maxRating:  { type: "number", field: "ratings.tmdb", range: "lte" },
 *   directorId: { type: "number", field: "director" },
 *   writerId:   { type: "number", field: "writers" },
 *   actorId:    { type: "number", field: "cast" },
 *   keyword:    { type: "array",  field: "keywords" },
 *   // … gerekirse ek filtreler
 * };
 * 
 * Kullanım örneği:
 * const { filter, sort, pagination } = buildQueryOptions(movieFieldConfig, req.query);
 */

/**
 * fieldConfig: {
 *   [paramName]: {
 *     type: "string" | "number" | "array",
 *     field: "modeldekiAlanAdi" (örn. "ratings.tmdb"),
 *     regex?: boolean,         // string tipli için kısmi arama (RegExp) yap
 *     range?: "gte" | "lte",   // number tipi için aralık (ör: min için "gte", max için "lte")
 *   },
 *   ... diğer parametreler
 * }
 * 
 * queryParams: req.query (örn. { title: "Inception", minRating: "8.5", page: "2", limit: "20", sort: "title", order: "asc" })
 */
function buildQueryOptions(fieldConfig, queryParams) {
  const filter = {};

  // 1. fieldConfig’e göre filter objesini dolduralım
  Object.keys(fieldConfig).forEach((paramKey) => {
    const cfg = fieldConfig[paramKey];
    const value = queryParams[paramKey];

    if (value === undefined || value === null || value === "") return;

    const { type, field, regex, range } = cfg;

    switch (type) {
      case "string":
        // eğer regex: true ise kısmi arama (case-insensitive)
        if (regex) {
          filter[field] = { $regex: value, $options: "i" };
        } else {
          // tam eşleşme istiyorsa => filter[field] = value
          filter[field] = value;
        }
        break;

      case "number":
        // number tipi, tek bir alan ise direkt eşle veya range varsa ona göre işle
        const num = Number(value);
        if (isNaN(num)) break; // geçerli sayı değilse ignore et

        if (range === "gte") {
          // örn: minRating => ratings.tmdb: { $gte: num }
          filter[field] = filter[field] || {};
          filter[field].$gte = num;
        } else if (range === "lte") {
          // örn: maxRating => ratings.tmdb: { $lte: num }
          filter[field] = filter[field] || {};
          filter[field].$lte = num;
        } else {
          // eğer range belirtilmezse tam eşleşme (örn: movieId)
          filter[field] = num;
        }
        break;

      case "array":
        // dizi yani “$in” kullanacağız
        // queryParams[paramKey] tek bir değer de olabilir, array de
        const arr = Array.isArray(value) ? value : [value];
        filter[field] = { $in: arr };
        break;

      default:
        // başka bir type tanımlanmadıysa ignore et
        break;
    }
  });

  // 2. Sıralama (sort) ve sayfalama (pagination)
  const sortField = queryParams.sort || "createdAt";
  const sortOrder = queryParams.order === "asc" ? 1 : -1;
  const sort = { [sortField]: sortOrder };

  const page = parseInt(queryParams.page) || 1;
  const limit = parseInt(queryParams.limit) || 20;
  const skip = (page - 1) * limit;

  const pagination = { page, limit, skip };
  return { filter, sort, pagination };
}

/**
 * Cache key oluşturmak için:
 * Parametre objesini (queryParams) alfabetik sırayla JSON’a çeviriyoruz.
 */
function buildCacheKeyFromQuery(q) {
  const ordered = {};
  Object.keys(q)
    .sort()
    .forEach((key) => {
      ordered[key] = q[key];
    });
  return `query:${JSON.stringify(ordered)}`;
}

module.exports = {
  buildQueryOptions,
  buildCacheKeyFromQuery
};
