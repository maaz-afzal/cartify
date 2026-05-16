const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

exports.getStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    const totalRevenue = 0;

    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue,
    });
  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({ message: "Server error while fetching stats" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      description,
      stock,
      images,
      brand,
      sku,
      discountPercentage,
      rating,
      tags,
    } = req.body;

    const product = new Product({
      name,
      price: Number(price),
      category,
      description: description || "",
      stock: Number(stock) || 0,
      images: images || [],
      brand: brand || "Cartify",
      sku: sku || `SKU-${Date.now()}`,
      discountPercentage: discountPercentage || 0,
      rating: rating || 0,
      tags: tags || ["product"],
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Server error while updating product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Server error while deleting product" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};
