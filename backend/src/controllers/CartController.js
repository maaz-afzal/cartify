const Cart = require("../models/Cart");
const Product = require("../models/Product");

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
