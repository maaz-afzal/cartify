import { createContext, useEffect, useState } from "react";
import cartService from "../services/cartService";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    const getData = await cartService.getCart();
    setCartItems(getData);
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
