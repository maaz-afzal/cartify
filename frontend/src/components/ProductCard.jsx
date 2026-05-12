import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FavoriteContext } from "../context/FavoriteContext";
import { Eye, Heart } from "lucide-react";
import ToastNotification from "./ToastNotification";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useContext(FavoriteContext);
  const [toast, setToast] = useState("");
  const [isFav, setIsFav] = useState(isFavorite(product._id));

  // Add to cart button function
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ productId: product._id, quantity: 1 });
    setToast("Added to cart!");
  };

  // Add to favorites button function
  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFav) {
      await removeFromFavorites(product._id);
      setIsFav(false);
      setToast("Removed from favorites");
    } else {
      await addToFavorites(product._id);
      setIsFav(true);
      setToast("Added to favorites");
    }
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
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative">

        {/* favorite button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-110 transition"
        >
          <Heart
            size={20}
            className={
              isFav
                ? "fill-red-500 text-red-500"
                : "text-gray-500 dark:text-gray-400"
            }
          />
        </button>

        {/* product image */}
        <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3 left-3 bg-black/70 dark:bg-gray-900/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
            {category}
          </span>
        </div>

        {/* product content */}
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
            {name}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
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
                    i < Math.floor(rating)
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              ({rating})
            </span>
          </div>

          {/* Price and preview button */}
          <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-100 dark:border-gray-800">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${price}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddToCart}
                className="bg-black dark:bg-gray-800 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 active:scale-95"
              >
                Add to Cart
              </button>
              <button className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer">
                <Eye size={18} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
