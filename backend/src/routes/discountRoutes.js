// ✅ Correct - use require
const express = require("express");
const {
  applyDiscount,
  removeDiscount,
  getDiscountInfo,
} = require("../controllers/discountController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/apply", authMiddleware, applyDiscount);
router.delete("/remove", authMiddleware, removeDiscount);
router.get("/info", authMiddleware, getDiscountInfo);

module.exports = router;
