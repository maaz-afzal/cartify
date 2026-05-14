import api from "./api";

// Function to get products
const getProducts = async (params) => {
  try {
    const res = await api.get("/api/products", { params });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Function to get product by id
const getProductById = async (id) => {
  try {
    const res = await api.get(`/api/products/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { getProducts, getProductById };
