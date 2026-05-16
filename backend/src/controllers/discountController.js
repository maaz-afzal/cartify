const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Valid discount codes (store in database later)
const VALID_DISCOUNTS = [
  { code: "SAVE10", percent: 10, minAmount: 0, type: "percentage" },
  { code: "SAVE20", percent: 20, minAmount: 100, type: "percentage" },
  { code: "WELCOME15", percent: 15, minAmount: 0, type: "percentage" },
  { code: "FREESHIP", percent: 0, minAmount: 0, type: "free_shipping" },
];

const applyDiscount = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { code } = req.body;

    // 1. Check if code is provided
    if (!code) {
      return res.status(400).json({ message: "Discount code is required" });
    }

    // 2. Find user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (cart.cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 3. Find discount in valid list
    const discount = VALID_DISCOUNTS.find((d) => d.code === code.toUpperCase());

    if (!discount) {
      return res.status(400).json({ message: "Invalid discount code" });
    }

    // 4. Calculate subtotal
    let subtotal = 0;
    for (const item of cart.cartItems) {
      const product = await Product.findById(item.productId);
      if (product) {
        subtotal += product.price * item.quantity;
      }
    }

    // 5. Check minimum amount condition
    if (subtotal < discount.minAmount) {
      return res.status(400).json({
        message: `Minimum order of $${discount.minAmount} required for ${discount.code}`,
      });
    }

    // 6. Calculate discount amount
    let discountAmount = 0;
    let shippingDiscount = 0;

    if (discount.type === "free_shipping") {
      // Free shipping - assume $5 shipping
      shippingDiscount = 5;
      discountAmount = 0;
    } else if (discount.type === "percentage") {
      discountAmount = (subtotal * discount.percent) / 100;
    }

    // 7. Calculate final total
    const shippingCost = subtotal > 50 ? 0 : 5;
    const finalShipping = discount.type === "free_shipping" ? 0 : shippingCost;
    const finalTotal = subtotal - discountAmount + finalShipping;

    // 8. Save discount to cart (optional - if you want to persist)
    cart.discountCode = discount.code;
    cart.discountPercent = discount.percent;
    cart.discountAmount = discountAmount;
    await cart.save();

    // 9. Send response
    res.json({
      success: true,
      code: discount.code,
      percent: discount.percent,
      discountAmount: discountAmount,
      originalTotal: subtotal,
      shippingCost: finalShipping,
      finalTotal: finalTotal,
      message: `${discount.code} applied successfully!`,
    });
  } catch (error) {
    console.error("Apply discount error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Remove discount
const removeDiscount = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Clear discount fields
    cart.discountCode = null;
    cart.discountPercent = 0;
    cart.discountAmount = 0;
    await cart.save();

    // Calculate original totals
    let subtotal = 0;
    for (const item of cart.cartItems) {
      const product = await Product.findById(item.productId);
      if (product) {
        subtotal += product.price * item.quantity;
      }
    }

    const shippingCost = subtotal > 50 ? 0 : 5;

    res.json({
      success: true,
      message: "Discount removed successfully",
      originalTotal: subtotal,
      shippingCost: shippingCost,
      finalTotal: subtotal + shippingCost,
    });
  } catch (error) {
    console.error("Remove discount error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get current discount info
const getDiscountInfo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({ hasDiscount: false });
    }

    res.json({
      hasDiscount: !!cart.discountCode,
      discountCode: cart.discountCode,
      discountPercent: cart.discountPercent,
      discountAmount: cart.discountAmount,
    });
  } catch (error) {
    console.error("Get discount info error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { applyDiscount, removeDiscount, getDiscountInfo };
