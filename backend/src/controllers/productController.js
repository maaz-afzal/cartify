const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, category, brand } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Filter Object
    let query = {};

    if (category && category !== "All") {
      query.category = category;
    }
    if (brand && brand !== "All") {
      if (brand === "No Brand") {
        query.brand = { $exists: false };
      } else {
        query.brand = brand;
      }
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const [products, total] = await Promise.all([
      Product.find(query).skip(skip).limit(parseInt(limit)).lean(),
      Product.countDocuments(query),
    ]);

    res.status(200).json({
      products,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getProducts, getProductById };
