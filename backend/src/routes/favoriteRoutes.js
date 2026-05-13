const express = require("express");
const {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
} = require("../controllers/favoriteController");

const router = express.Router();

router.get("/", getFavorites);
router.post("/", addToFavorites);
router.delete("/:productId", removeFromFavorites);

module.exports = router;
