const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get cart items
const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = {
        userId,
        cartItems: [],
        discount: 0,
        shippingCost: 0,
      };
      return res.status(200).json(cart);
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add items to cart
const addToCart = async (req, res) => {
  try {
    console.log("Request user:", req.user); // Debug log
    const userId = req.user.userId;
    console.log("Extracted userId:", userId);

    if (!userId) {
      return res.status(401).json({ message: "User ID not found in token" });
    }

    const { productId, quantity } = req.body;
    console.log("Product ID:", productId, "Quantity:", quantity);

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart if doesn't exist
      cart = new Cart({
        userId,
        cartItems: [{ productId, quantity, price: product.price }],
      });
      await cart.save();
      return res.status(201).json(cart);
    } else {
      const cartItem = cart.cartItems.find(
        (item) => item.productId.toString() === productId,
      );
      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        cart.cartItems.push({ productId, quantity, price: product.price });
      }
      await cart.save();
      return res.status(200).json(cart);
    }
  } catch (error) {
    console.error("Add to cart error:", error); // Log full error
    res.status(500).json({ message: error.message }); // Send actual error message
  }
};

// Remove items from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const { productId } = req.params;

    const cartItem = cart.cartItems.find(
      (item) => item.productId.toString() === productId,
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.cartItems = cart.cartItems.filter(
      (item) => item.productId.toString() !== productId,
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update cart items
const updateCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const { productId } = req.params;
    const { quantity } = req.body;
    const cartItem = cart.cartItems.find(
      (item) => item.productId.toString() === productId,
    );
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (quantity > 0) {
      cartItem.quantity = quantity;
    } else {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 0" });
    }
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Clearing Overall cart items

const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.cartItems = [];
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
  clearCart,
};
