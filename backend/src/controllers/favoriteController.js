const Favorite = require("../models/Favorite");
const Product = require("../models/Product");

const getFavorites = async (req, res) => {
  try {
    const userId = req.user.userId;
    const favorite = await Favorite.findOne({ userId })
      .populate("products.productId")
      .lean();

    if (!favorite) {
      return res.status(200).json({ products: [] });
    }

    res.status(200).json({ products: favorite.products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addToFavorites = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    const product = await Product.findById(productId).lean();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let favorite = await Favorite.findOne({ userId });

    if (!favorite) {
      favorite = await Favorite.create({ userId, products: [{ productId }] });
      return res.status(201).json({ message: "Added to favorites", favorite });
    }

    const alreadyExists = favorite.products.some(
      (item) => item.productId.toString() === productId,
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "Product already in favorites" });
    }

    favorite.products.push({ productId });
    await favorite.save();

    res.status(200).json({ message: "Added to favorites", favorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    const favorite = await Favorite.findOne({ userId });
    if (!favorite) {
      return res.status(404).json({ message: "Favorites not found" });
    }

    favorite.products = favorite.products.filter(
      (item) => item.productId.toString() !== productId,
    );

    await favorite.save();

    await favorite.populate("products.productId");

    res.status(200).json({
      message: "Removed from favorites",
      favorite,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getFavorites, addToFavorites, removeFromFavorites };
