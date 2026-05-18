import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MapPin } from "lucide-react";
import { CartContext } from "../context/CartContext";
import orderService from "../services/orderService";
import ToastNotification from "../components/ToastNotification";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    pinCode: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cartItems || cartItems.length === 0) {
      setToast("Your cart is empty!");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          pinCode: formData.pinCode,
          phone: formData.phone,
        },
        items: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name || "Product",
          price: item.price,
          quantity: item.quantity,
          image: item.image || "",
        })),
        totalPrice: calculateTotal(),
        paymentMethod: "COD",
      };
      const response = await orderService.createOrder(orderData);
      await clearCart();

      navigate(`/order-success?id=${response.order._id}`);
    } catch (error) {
      console.error("Order failed:", error);
      setToast(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = calculateTotal();
  const shipping = subtotal > 50 ? 0 : 5;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {toast && (
        <ToastNotification message={toast} onClose={() => setToast("")} />
      )}

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Checkout
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* shipping form */}
          <div className="md:col-span-2 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={18} className="text-amber-500" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Shipping Address
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none disabled:opacity-50"
              />
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none disabled:opacity-50"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none disabled:opacity-50"
                />
                <input
                  type="text"
                  name="pinCode"
                  placeholder="Pin Code"
                  value={formData.pinCode}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none disabled:opacity-50"
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* order summary */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 h-fit">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
              Order Summary
            </h3>

            <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-3">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
              </div>
            </div>

            <div className="flex justify-between mt-3 font-semibold text-gray-800 dark:text-white">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
              Cash on Delivery available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
