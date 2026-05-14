import api from "./api";

const getFavorites = async () => {
  const res = await api.get("/api/favorites");
  return res.data;
};

const addToFavorites = async (productId) => {
  const res = await api.post("/api/favorites", { productId });
  return res.data;
};

const removeFromFavorites = async (productId) => {
  const res = await api.delete(`/api/favorites/${productId}`);
  return res.data;
};

export default { getFavorites, addToFavorites, removeFromFavorites };
