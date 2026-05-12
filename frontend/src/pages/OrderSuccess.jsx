import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ShoppingBag } from "lucide-react";
import confetti from "canvas-confetti";

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
      startVelocity: 15,
      colors: ["#f59e0b", "#d97706", "#fbbf24", "#fcd34d"],
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Order Confirmed! 🎉
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Thank you for shopping with Cartify! We've received your order and
          will process it soon.
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Order ID:{" "}
            <span className="font-mono font-semibold">
              #CART{Math.floor(Math.random() * 100000)}
            </span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
        >
          <ShoppingBag size={18} />
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
