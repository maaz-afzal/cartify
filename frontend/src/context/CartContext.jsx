import { createContext, useEffect, useState } from "react";
import cartService from "../services/cartService";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getCart();
    }
  }, []);

  const getCart = async () => {
    try {
      const getData = await cartService.getCart();
      setCartItems(getData);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
    }
  };
  const addToCart = async (data) => {
    const addCart = await cartService.addToCart(data);
    setCartItems(addCart);
  };
  const removeFromCart = async (id) => {
    const removeCart = await cartService.removeFromCart(id);
    setCartItems(removeCart);
  };
  const updateCart = async (id, data) => {
    const cartUpdate = await cartService.updateCart(id, data);
    setCartItems(cartUpdate);
  };
  const clearCart = async () => {
    const res = await cartService.clearCart();
    setCartItems(res);
  };

  return (
    <CartContext.Provider
      value={{
        getCart,
        addToCart,
        updateCart,
        removeFromCart,
        clearCart,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
