import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Eye } from "lucide-react";
import ToastNotification from "./ToastNotification";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [toast, setToast] = useState("");

  const handleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ productId: product._id, quantity: 1 });
    setToast("Added to cart!");
  };

  const name = product?.name || "Beauty Product";
  const price = product?.price || "24.99";
  const image =
    product?.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image";
  const category = product?.tags?.[0] || "Cosmetics";
  const rating = product?.rating || 0;

  return (
    <Link to={`/product/${product._id}`} className="block group">
      {toast && (
        <ToastNotification message={toast} onClose={() => setToast("")} />
      )}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-base font-semibold text-gray-800 group-hover:text-black transition-colors">
            {name}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2">
            {product?.description ||
              "High-quality beauty product designed for everyday use."}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400 text-sm">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={
                    i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-400">({rating})</span>
          </div>

          {/* Price + Buttons */}
          <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-100">
            <span className="text-lg font-bold text-gray-900">${price}</span>

            <div className="flex items-center gap-2">
              {/* Add to Cart */}
              <button
                onClick={handleCart}
                className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 active:scale-95"
              >
                Add to Cart
              </button>
              {/* Preview Button */}
              <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition cursor-pointer">
                <Eye size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
