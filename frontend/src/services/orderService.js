import api from "./api";

const createOrder = async (orderData) => {
  try {
    const res = await api.post("/api/orders", orderData);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { createOrder };
