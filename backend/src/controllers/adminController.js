const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

exports.getStats = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();

    const allOrders = await Order.find();

    let revenue = 0;
    for (const order of allOrders) {
      revenue += order.totalPrice;
    }

    res.json({
      totalProducts: productCount,
      totalUsers: userCount,
      totalOrders: orderCount,
      totalRevenue: revenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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

    const newProduct = new Product({
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

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Server error while updating product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
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
