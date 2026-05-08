import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const handleCart = () => {
    addToCart({ productId: product._id, quantity: 1 });
  };
  return (
    <div className="max-w-xs bg-white rounded-xl shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={
            product?.images?.[0] ||
            "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={product?.name || "Product"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="mb-1">
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            beauty
          </span>
          <span className="text-xs text-gray-500 uppercase tracking-wider ml-1">
            cosmetics
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800">
          {product?.name || "Beauty Cosmetics"}
        </h3>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product?.description ||
            "A luxurious beauty cosmetic that enhances your natural glow and provides lasting hydration."}
        </p>

        <div className="flex items-center mt-2">
          <div className="flex text-yellow-400 text-sm">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-xl font-bold text-gray-800">
            ${product?.price || "24.99"}
          </span>
          <span className="text-sm text-gray-400 line-through">$26.00</span>
        </div>

        <button
          className="w-full mt-3 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-medium transition"
          onClick={handleCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
