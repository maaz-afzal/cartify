import api from "./api";

// get the favorites
const getFavorites = async () => {
  try {
    const res = await api.get("/api/favorites");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// add product to favorites
const addToFavorites = async (productId) => {
  try {
    const res = await api.post("/api/favorites", { productId });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// remove product from favorites
const removeFromFavorites = async (productId) => {
  try {
    const res = await api.delete(`/api/favorites/${productId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Checking if the product is favorited
const isFavorited = async (productId) => {
  try {
    const favorites = await getFavorites();
    return (
      favorites.products?.some((item) => item.productId._id === productId) ||
      false
    );
  } catch (error) {
    return false;
  }
};

export default {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  isFavorited,
};
