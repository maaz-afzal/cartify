const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Product = require("../models/Product");

router.get("/run", async (req, res) => {
  try {
    // Admin user
    const hash = await bcrypt.hash("admin123", 10);
    await User.findOneAndUpdate(
      { email: "admin@cartify.com" },
      { name: "Admin", email: "admin@cartify.com", password: hash, role: "admin" },
      { upsert: true, new: true }
    );

    // Products from dummyjson
    const response = await fetch("https://dummyjson.com/products?limit=30");
    const { products } = await response.json();

    await Product.deleteMany({});
    const validProducts = products.map((p, i) => ({
      name: p.title,
      description: p.description,
      price: p.price,
      discountPercentage: p.discountPercentage || 0,
      rating: p.rating,
      stock: p.stock,
      category: p.category,
      brand: p.brand || `Brand${i + 1}`,
      sku: `SKU${i + 1}`,
      images: [p.thumbnail],
      tags: p.tags || ["product"],
    }));
    await Product.insertMany(validProducts);

    res.json({ success: true, message: `${validProducts.length} products + admin seeded!` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;