// routes/shelfRoutes.js

const express = require("express");
const router = express.Router();
const {
  getShelves,
  getShelfById,
  createShelf,
  updateShelf,
  deleteShelf,
  addFilm,
  removeFilm,
  searchShelves,
  addOrUpdateGrant, // ekledik
  removeGrant 
} = require("../controllers/shelfController");
const { validToken} = require("../middleware/validation");

// Listeleme ve arama (public/private karar auth içinde ele alınabilir)
router.get("/", validToken ,getShelves);
// Full‐text arama
router.get("/search", validToken,searchShelves);
// Tek bir shelf
router.get("/:id", validToken,getShelfById);

// Yeni shelf oluşturma
router.post("/", validToken ,createShelf);
// Shelf güncelleme
router.put("/:id", validToken ,updateShelf);
// Shelf silme
router.delete("/:id", validToken, deleteShelf);

// Film ekleme / çıkarma
router.post("/:id/films", validToken,addFilm);
router.delete("/:id/films/:movieId", validToken,removeFilm);
// ■ GRANT İŞLEMLERİ
//   - Grant verme veya güncelleme
router.post("/:id/grants",validToken ,addOrUpdateGrant);

//   - Grant kaldırma
router.delete("/:id/grants/:userId", validToken,removeGrant);

module.exports = router;
