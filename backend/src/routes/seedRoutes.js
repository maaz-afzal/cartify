const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Product = require("../models/Product");

router.get("/run", async (req, res) => {
  try {
    const hash = await bcrypt.hash("admin123", 10);
    await User.findOneAndUpdate(
      { email: "admin@cartify.com" },
      { name: "Admin", email: "admin@cartify.com", password: hash, role: "admin" },
      { upsert: true, new: true }
    );

    await Product.deleteMany({});
    await Product.insertMany([
      { name: "Glow Serum", price: 29.99, category: "Skincare", brand: "GlowCo", stock: 50, description: "Brightening serum", image: "https://placehold.co/300x300" },
      { name: "Matte Lipstick", price: 14.99, category: "Makeup", brand: "LuxeLips", stock: 100, description: "Long-lasting matte", image: "https://placehold.co/300x300" },
      { name: "Hydra Cream", price: 24.99, category: "Skincare", brand: "GlowCo", stock: 75, description: "Deep moisturizer", image: "https://placehold.co/300x300" },
    ]);

    res.json({ success: true, message: "Admin + products seeded!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;