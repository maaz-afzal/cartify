const { getProducts, getProductById } = require("../controllers/productController");
const express = require("express");
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;