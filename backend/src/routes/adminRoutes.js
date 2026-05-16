const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const {
  getStats,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getUsers,
} = require("../controllers/adminController");

const router = express.Router();

// Dashboard Stats
router.get("/stats", authMiddleware, adminMiddleware, getStats);

// Products Routes
router.get("/products", authMiddleware, adminMiddleware, getProducts);
router.post("/products", authMiddleware, adminMiddleware, addProduct);
router.put("/products/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/products/:id", authMiddleware, adminMiddleware, deleteProduct);

// Users Routes
router.get("/users", authMiddleware, adminMiddleware, getUsers);

module.exports = router;
