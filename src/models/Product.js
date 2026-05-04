const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    discountPercentage: { type: Number, min: 0, max: 100 },
    rating: { type: Number, min: 0, max: 5 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    images: [{ type: String }],
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product
