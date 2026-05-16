import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { Trash2, Plus, Minus, ShoppingBag, Tag, X } from "lucide-react";
import productService from "../services/productService";
import ToastNotification from "../components/ToastNotification";
import discountService from "../services/discountService";

const Cart = () => {
  const { cartItems, removeFromCart, updateCart, getCart } =
    useContext(CartContext);
  const { isLoggedin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [productsMap, setProductsMap] = useState({});
  const [toast, setToast] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountLoading, setDiscountLoading] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountError, setDiscountError] = useState("");

  const handleDiscountButtonClick = (code) => {
    setDiscountCode(code);
  };

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      setDiscountError("Please enter a discount code");
      return;
    }

    setDiscountLoading(true);
    setDiscountError("");

    try {
      const response = await discountService.applyDiscount(discountCode);

      setAppliedDiscount({
        code: response.code,
        percent: response.percent,
        discountAmount: response.discountAmount,
      });

      setToast(response.message);
      setDiscountCode("");
    } catch (error) {
      setDiscountError(
        error.response?.data?.message || "Failed to apply discount",
      );
    } finally {
      setDiscountLoading(false);
    }
  };

  const handleRemoveDiscount = async () => {
    try {
      const response = await discountService.removeDiscount();
      setAppliedDiscount(null);
      setToast(response.message);
    } catch (error) {
      setToast(error.response?.data?.message || "Failed to remove discount");
    }
  };

  useEffect(() => {
    const loadDiscountInfo = async () => {
      if (isLoggedin) {
        try {
          const discountInfo = await discountService.getDiscountInfo();
          if (discountInfo.hasDiscount) {
            setAppliedDiscount({
              code: discountInfo.discountCode,
              percent: discountInfo.discountPercent,
              discountAmount: discountInfo.discountAmount,
            });
          }
        } catch (error) {
          console.error("Failed to load discount info:", error);
        }
      }
    };
    loadDiscountInfo();
  }, [isLoggedin]);

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
    // Remove discount when cart changes
    if (appliedDiscount) {
      await handleRemoveDiscount();
    }
    setToast("Cart updated successfully!");
  };

  const handleRemoveItem = async (itemId) => {
    await removeFromCart(itemId);
    // Remove discount when cart changes
    if (appliedDiscount) {
      await handleRemoveDiscount();
    }
    setToast("Item removed from cart.");
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
    const subtotal = calculateSubtotal();
    // Free shipping if FREESHIP discount applied OR subtotal > 50
    if (appliedDiscount?.code === "FREESHIP" || subtotal > 50) {
      return 0;
    }
    return 5;
  };

  const calculateDiscountAmount = () => {
    // If FREESHIP discount, no percentage discount
    if (appliedDiscount?.code === "FREESHIP") {
      return 0;
    }
    return appliedDiscount?.discountAmount || 0;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscountAmount();
    const shipping = calculateShipping();
    return subtotal - discount + shipping;
  };

  const handleDownloadBill = () => {
    if (cartItems.length === 0) {
      setToast("Cart is empty! Add items to download bill.");
      return;
    }

    const headers = ["Product Name", "Price", "Quantity", "Total"];

    const rows = cartItems.map((item) => {
      const product = getProduct(item.productId);
      const total = item.price * item.quantity;
      return [
        `"${product.name || "Product"}"`,
        `$${item.price}`,
        item.quantity,
        `$${total.toFixed(2)}`,
      ];
    });

    const subtotal = calculateSubtotal();
    const discount = calculateDiscountAmount();
    const shipping = calculateShipping();
    const total = calculateTotal();

    const summaryRows = [
      [],
      ["SUBTOTAL", "", `$${subtotal.toFixed(2)}`],
      ...(discount > 0 ? [["DISCOUNT", "", `-$${discount.toFixed(2)}`]] : []),
      ["SHIPPING", "", shipping === 0 ? "FREE" : `$${shipping}`],
      ["TOTAL", "", `$${total.toFixed(2)}`],
    ];

    const csvData = [headers, ...rows, ...summaryRows];
    const csvContent = csvData.map((row) => row.join(",")).join("\n");
    const finalCsv = `${csvContent}\n\n"Order Date: ${new Date().toLocaleString()}"\n"Thank you for shopping with Cartify!"`;

    const blob = new Blob([finalCsv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.setAttribute(
      "download",
      `CartifyBill_${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setToast("Bill downloaded successfully!");
  };

  if (!isLoggedin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <ShoppingBag
            size={64}
            className="mx-auto text-gray-400 dark:text-gray-600 mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            Your cart is waiting
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Please login to view your cart items
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

  if (
    loading ||
    (cartItems.length > 0 && Object.keys(productsMap).length === 0)
  ) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          Loading your cart...
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <ShoppingBag
            size={64}
            className="mx-auto text-gray-400 dark:text-gray-600 mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Looks like you haven't added any items yet
          </p>
          <Link
            to="/"
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = calculateSubtotal();
  const discount = calculateDiscountAmount();
  const shipping = calculateShipping();
  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {toast && (
        <ToastNotification message={toast} onClose={() => setToast("")} />
      )}
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
              <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-100 dark:bg-gray-800 px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>

              {cartItems.map((item) => {
                const product = getProduct(item.productId);
                return (
                  <div
                    key={item._id}
                    className="border-t border-gray-200 dark:border-gray-800 px-4 py-4"
                  >
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
                          <h3 className="font-medium text-gray-800 dark:text-white">
                            {product.name || "Product"}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {product.category || "Category"}
                          </p>
                        </div>
                      </div>

                      <div className="md:col-span-2 text-center">
                        <span className="text-gray-800 dark:text-white font-medium">
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
                          className="p-1 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                          <Minus
                            size={16}
                            className="text-gray-600 dark:text-gray-400"
                          />
                        </button>
                        <span className="w-8 text-center font-medium text-gray-800 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.productId,
                              item.quantity + 1,
                            )
                          }
                          className="p-1 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                          <Plus
                            size={16}
                            className="text-gray-600 dark:text-gray-400"
                          />
                        </button>
                      </div>

                      <div className="md:col-span-1 text-center">
                        <span className="font-semibold text-gray-800 dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <div className="md:col-span-1 text-center">
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-red-500 hover:text-red-700 transition"
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
                className="text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 flex items-center gap-2 transition"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          <div className="lg:w-96">
            {/* Discount Section */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-4">
                <Tag size={18} className="text-amber-500" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Apply Discount
                </h2>
              </div>

              {appliedDiscount ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-green-700 dark:text-green-400 font-semibold">
                        {appliedDiscount.code}
                      </span>
                      <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                        {appliedDiscount.percent}% off - $
                        {appliedDiscount.discountAmount?.toFixed(2)} saved
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveDiscount}
                      className="text-gray-500 hover:text-red-500 transition"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) =>
                        setDiscountCode(e.target.value.toUpperCase())
                      }
                      placeholder="Enter coupon code"
                      className="flex-1 border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 transition"
                    />
                    <button
                      onClick={handleApplyDiscount}
                      disabled={discountLoading}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-lg font-medium transition disabled:opacity-50"
                    >
                      {discountLoading ? "Applying..." : "Apply"}
                    </button>
                  </div>
                  {discountError && (
                    <p className="text-red-500 text-sm mt-2">{discountError}</p>
                  )}

                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      Available offers:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["SAVE10", "SAVE20", "WELCOME15", "FREESHIP"].map(
                        (code) => (
                          <button
                            key={code}
                            onClick={() => handleDiscountButtonClick(code)}
                            className="text-xs bg-gray-100 dark:bg-gray-800 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-gray-600 dark:text-gray-400 px-2 py-1 rounded transition"
                          >
                            {code}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-4">
              <button
                onClick={handleDownloadBill}
                className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Bill (CSV)
              </button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 transition-colors duration-300 mt-5">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Order Summary
              </h2>

              <div className="space-y-2 border-b border-gray-200 dark:border-gray-800 pb-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Discount ({appliedDiscount?.percent}% off)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
                </div>
              </div>

              <div className="flex justify-between mt-4 pt-2">
                <span className="font-semibold text-gray-800 dark:text-white text-lg">
                  Total
                </span>
                <span className="font-bold text-2xl text-gray-800 dark:text-white">
                  ${total.toFixed(2)}
                </span>
              </div>

              {subtotal > 50 && !appliedDiscount && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-2 text-center">
                  ✨ Add items worth ${(50 - subtotal).toFixed(2)} more for free
                  shipping!
                </p>
              )}

              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-medium transition"
              >
                Proceed to Checkout
              </button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
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
