const express = require("express");
const {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
} = require("../controllers/favoriteController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getFavorites);
router.post("/", authMiddleware, addToFavorites);
router.delete("/:productId", authMiddleware, removeFromFavorites);

module.exports = router;
