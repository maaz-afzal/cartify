import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Minus, Plus } from "lucide-react";
import productService from "../services/productService";
import Navbar from "../components/Navbar";
import ToastNotification from "../components/ToastNotification";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        console.log("Error loading product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ productId: product._id, quantity: qty });
    setToast(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">
          Loading product...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">
          Product not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {toast && (
        <ToastNotification message={toast} onClose={() => setToast("")} />
      )}
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* IMAGE */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-112.5 object-cover"
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={
                    i < Math.floor(product.rating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-700"
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({product.rating || 0})
            </span>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags?.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => setQty((prev) => Math.max(1, prev - 1))}
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition"
            >
              <Minus size={18} className="text-gray-700 dark:text-gray-300" />
            </button>

            <span className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white">
              {qty}
            </span>

            <button
              onClick={() => setQty((prev) => prev + 1)}
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition"
            >
              <Plus size={18} className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-black dark:bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-700 active:scale-95 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
