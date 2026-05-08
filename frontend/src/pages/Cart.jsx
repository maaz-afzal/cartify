import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import productService from "../services/productService";

const Cart = () => {
  const { cartItems, removeFromCart, updateCart, getCart } =
    useContext(CartContext);
  const { isLoggedin } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [productsMap, setProductsMap] = useState({});

  useEffect(() => {
    const fetchCart = async () => {
      if (isLoggedin) {
        await getCart();
      }
      setLoading(false);
    };
    fetchCart();
  }, [isLoggedin]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (cartItems && cartItems.length > 0) {
        const productIds = cartItems.map((item) => item.productId);
        const uniqueIds = [...new Set(productIds)];

        const productPromises = uniqueIds.map((id) =>
          productService.getProductById(id),
        );
        const products = await Promise.all(productPromises);

        const map = {};
        products.forEach((product) => {
          map[product._id] = product;
        });
        setProductsMap(map);
      }
    };
    fetchProductDetails();
  }, [cartItems]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateCart(itemId, { quantity: newQuantity });
  };

  const handleRemoveItem = async (itemId) => {
    await removeFromCart(itemId);
  };

  const getProduct = (productId) => {
    return productsMap[productId] || {};
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 50 ? 0 : 5;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  if (!isLoggedin) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Your cart is waiting
          </h2>
          <p className="text-gray-500 mb-6">
            Please login to view your cart items
          </p>
          <Link
            to="/login"
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg"
          >
            Login to Continue
          </Link>
        </div>
      </div>
    );
  }

  if (
    loading ||
    (cartItems.length > 0 && Object.keys(productsMap).length === 0)
  ) {
    return (
      <div>
        <Navbar />
        <div className="text-center py-20">Loading your cart...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any items yet
          </p>
          <Link
            to="/"
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-100 px-4 py-3 text-sm font-medium text-gray-600">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>

              {cartItems.map((item) => {
                const product = getProduct(item.productId);
                return (
                  <div key={item._id} className="border-t px-4 py-4">
                    <div className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                      <div className="flex items-center gap-4 md:col-span-6">
                        <img
                          src={
                            product.images?.[0] ||
                            "https://via.placeholder.com/80"
                          }
                          alt={product.name || "Product"}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {product.name || "Product"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {product.category || "Category"}
                          </p>
                        </div>
                      </div>

                      <div className="md:col-span-2 text-center">
                        <span className="text-gray-800 font-medium">
                          ${item.price}
                        </span>
                      </div>

                      <div className="md:col-span-2 flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.productId,
                              item.quantity - 1,
                            )
                          }
                          className="p-1 rounded-md bg-gray-100 hover:bg-gray-200"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.productId,
                              item.quantity + 1,
                            )
                          }
                          className="p-1 rounded-md bg-gray-100 hover:bg-gray-200"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="md:col-span-1 text-center">
                        <span className="font-semibold text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <div className="md:col-span-1 text-center">
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <Link
                to="/"
                className="text-amber-600 hover:text-amber-700 flex items-center gap-2"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          <div className="lg:w-96">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-2 border-b pb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {calculateShipping() === 0
                      ? "Free"
                      : `$${calculateShipping()}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between mt-4 pb-4 border-b">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="font-bold text-xl text-gray-800">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>

              <button className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-medium transition">
                Proceed to Checkout
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Free shipping on orders over $50
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
