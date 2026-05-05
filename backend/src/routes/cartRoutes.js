const { getCart, addToCart, removeFromCart, updateCart, clearCart } = require("../controllers/CartController")
const express = require("express");
const router = express.Router();

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/clear", clearCart);
router.delete("/:productId", removeFromCart);
router.put("/:productId", updateCart);

module.exports = router;
