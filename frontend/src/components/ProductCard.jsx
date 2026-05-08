import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleCart = () => {
    // Prevent default behavior if needed, though usually not required for div/buttons
    addToCart({ productId: product._id, quantity: 1 });
  };

  // Helper to get safe values
  const name = product?.name || "Beauty Product";
  const price = product?.price || "24.99";
  const image =
    product?.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image";
  const category = product?.tags?.[0] || "Cosmetics";
  const rating = product?.rating || 0;

  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* Image Section */}
      <div className="relative h-48 w-full bg-gray-100">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col gap-2">
        {/* Category Tag */}
        <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
          {category}
        </span>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-800 leading-tight">
          {name}
        </h3>

        {/* Description - Simple truncation for beginners */}
        <p className="text-sm text-gray-500 line-clamp-2 h-10">
          {product?.description ||
            "High-quality beauty product designed for everyday use."}
        </p>

        {/* Rating Stars */}
        {rating > 0 && (
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
        )}

        {/* Price and Button Container */}
        <div className="mt-2 flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xl font-bold text-gray-900">${price}</span>

          <button
            onClick={handleCart}
            className="bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
