const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get cart items
const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    } else {
      res.status(200).json(cart);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add items to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;
    let product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      const newCart = new Cart({
        userId,
        cartItems: [{ productId, quantity, price: product.price }],
      });
      await newCart.save();
      res.status(201).json(newCart);
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
      res.status(200).json(cart);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
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
