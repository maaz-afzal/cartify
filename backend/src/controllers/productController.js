const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const productItems = await Product.find();
    if (productItems.length === 0) {
      return res.status(200).json([]);
    } else {
      res.status(200).json(productItems);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getProducts,
  getProductById,
};
