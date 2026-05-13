import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FavoriteContext } from "../context/FavoriteContext";
import { AuthContext } from "../context/AuthContext";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import ToastNotification from "../components/ToastNotification";

const Favorites = () => {
  const { favorites, removeFromFavorites, fetchFavorites } =
    useContext(FavoriteContext);
  const { isLoggedin } = useContext(AuthContext);
  const [toast, setToast] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      if (isLoggedin) {
        await fetchFavorites();
      }
      setLoading(false);
    };
    loadFavorites();
  }, [isLoggedin]);

  // function that remove favorite
  const handleRemove = async (productId, productName) => {
    await removeFromFavorites(productId);
    setToast(`${productName} removed from favorites`);
  };

  if (!isLoggedin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <Heart
            size={64}
            className="mx-auto text-gray-400 dark:text-gray-600 mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            Your favorites are waiting
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Please login to view your favorite items
          </p>
          <Link
            to="/login"
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition"
          >
            Login to Continue
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          Loading your favorites...
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <Heart
            size={64}
            className="mx-auto text-gray-400 dark:text-gray-600 mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            Your favorites list is empty
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Start adding items you love to your favorites
          </p>
          <Link
            to="/"
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {toast && (
        <ToastNotification message={toast} onClose={() => setToast("")} />
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
          <Heart className="text-amber-500" size={28} />
          My Favorites ({favorites.length})
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* displying favorite items */}
          {favorites.map((item) => {
            const product =
              typeof item.productId === "object" ? item.productId : null;

            if (!product) return null;

            return (
              <div
                key={product._id}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Link to={`/product/${product._id}`}>
                  <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={
                        product.images?.[0] ||
                        "https://placehold.co/300x300?text=No+Image"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <Link to={`/product/${product._id}`}>
                    <h3 className="font-semibold text-gray-800 dark:text-white hover:text-amber-600 transition">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRemove(product._id, product.name)}
                        className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-500 hover:text-white transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
