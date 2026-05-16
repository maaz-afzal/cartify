import api from "./api";

const getStats = async () => {
  try {
    const res = await api.get("/api/admin/stats");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getProducts = async () => {
  try {
    const res = await api.get("/api/admin/products");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addProduct = async (productData) => {
  try {
    const res = await api.post("/api/admin/products", productData);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateProduct = async (id, productData) => {
  try {
    const res = await api.put(`/api/admin/products/${id}`, productData);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const res = await api.delete(`/api/admin/products/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUsers = async () => {
  try {
    const res = await api.get("/api/admin/users");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  getStats,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getUsers,
};
