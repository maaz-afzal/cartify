import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MapPin, CreditCard, Truck } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("shippingAddress", JSON.stringify(formData));
    navigate("/order-success");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Checkout
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Shipping Form */}
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
                className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
              />
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <input
                  type="text"
                  name="pinCode"
                  placeholder="Pin Code"
                  value={formData.pinCode}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
              />

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-medium transition"
              >
                Place Order
              </button>
            </form>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 h-fit">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
              Order Summary
            </h3>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-3 mt-3">
              <div className="flex justify-between font-semibold text-gray-800 dark:text-white">
                <span>Total</span>
                <span>To be calculated</span>
              </div>
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
