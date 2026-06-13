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
const { getAllOrders, updateOrderStatus } = require("../controllers/OrderController");

const router = express.Router();

router.get("/stats", authMiddleware, adminMiddleware, getStats);
router.get("/products", authMiddleware, adminMiddleware, getProducts);
router.post("/products", authMiddleware, adminMiddleware, addProduct);
router.put("/products/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/products/:id", authMiddleware, adminMiddleware, deleteProduct);

router.get("/users", authMiddleware, adminMiddleware, getUsers);

router.get("/orders", authMiddleware, adminMiddleware, getAllOrders);
router.put("/orders/:id/status", authMiddleware, adminMiddleware, updateOrderStatus,);

module.exports = router;
