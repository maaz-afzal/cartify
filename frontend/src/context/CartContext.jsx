import { createContext, useEffect, useState } from "react";
import cartService from "../services/cartService";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCart();
    }
  }, []);

  const getCart = async () => {
    try {
      const data = await cartService.getCart();
      setCartItems(data.cartItems || []);
    } catch {
      setCartItems([]);
    }
  };

  const addToCart = async (data) => {
    try {
      const res = await cartService.addToCart(data);
      setCartItems(res.cartItems);
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const res = await cartService.removeFromCart(id);
      setCartItems(res.cartItems);
    } catch (err) {
      console.error("Remove from cart failed:", err);
    }
  };

  const updateCart = async (id, data) => {
    try {
      const res = await cartService.updateCart(id, data);
      setCartItems(res.cartItems);
    } catch (err) {
      console.error("Update cart failed:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, getCart, addToCart, updateCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;