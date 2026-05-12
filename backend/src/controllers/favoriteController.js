const Favorite = require("../models/Favorite");
const Product = require("../models/Product");

// Get the favorites
const getFavorites = async (req, res) => {
  try {
    const userId = req.user.userId;
    let favorite = await Favorite.findOne({ userId }).populate(
      "products.productId",
    );

    if (!favorite) {
      return res.status(200).json({ products: [] });
    }

    res.status(200).json({ products: favorite.products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// adding products to favorites
const addToFavorites = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let favorite = await Favorite.findOne({ userId });

    if (!favorite) {
      favorite = new Favorite({
        userId,
        products: [{ productId }],
      });
      await favorite.save();
      return res.status(201).json({ message: "Added to favorites", favorite });
    }

    const alreadyExists = favorite.products.some(
      (item) => item.productId.toString() === productId,
    );

    if (alreadyExists) {
      return res
        .status(400)
        .json({ message: "Product is already in favorites" });
    }

    favorite.products.push({ productId });
    await favorite.save();

    res.status(200).json({ message: "Added to favorites", favorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Remove from favorites
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

    // CHANGE: Wapas save karte waqt populate karein taaki pura data mile
    const updatedFavorite = await Favorite.findById(favorite._id).populate(
      "products.productId",
    );

    res.status(200).json({
      message: "Removed from favorites",
      favorite: updatedFavorite, // Ab isme pura product data hoga
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
};
