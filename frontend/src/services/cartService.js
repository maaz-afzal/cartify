import api from "./api";

// Function to get cart items
const getCart = async () => {
  try {
    const res = await api.get("/api/cart");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Function to add item to cart
const addToCart = async (data) => {
  try {
    const res = await api.post("/api/cart", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Function to remove item from cart
const removeFromCart = async (id) => {
  try {
    const res = await api.delete(`/api/cart/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Function to update cart item
const updateCart = async (id, data) => {
  try {
    const res = await api.put(`/api/cart/${id}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { getCart, addToCart, removeFromCart, updateCart };
