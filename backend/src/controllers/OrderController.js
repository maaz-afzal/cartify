const Order = require("../models/Order");
const Cart = require("../models/Cart");

const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { shippingAddress, items, paymentMethod, totalPrice } = req.body;

    if (!shippingAddress || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const shippingPrice = totalPrice > 50 ? 0 : 5;
    const finalPrice = totalPrice + shippingPrice;

    const newOrder = new Order({
      userId,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || "COD",
      itemsPrice: totalPrice,
      shippingPrice,
      discountAmount: 0,
      totalPrice: finalPrice,
      status: "Pending",
    });

    await newOrder.save();

    await Cart.findOneAndUpdate({ userId }, { cartItems: [] }, { new: true });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: {
        _id: newOrder._id,
        totalPrice: newOrder.totalPrice,
        status: newOrder.status,
      },
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const isOwner = order.userId.toString() === req.user.userId;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(order);
  } catch (error) {
    console.error("Get order by id error:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

const getOrderCount = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.json({ totalOrders });
  } catch (error) {
    console.error("Get order count error:", error);
    res.status(500).json({ message: "Failed to fetch order count" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: "Order status updated",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  getOrderCount,
  updateOrderStatus,
};
