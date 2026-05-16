import api from "./api";

const applyDiscount = async (code) => {
  try {
    const res = await api.post("api/discount/apply", { code });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const removeDiscount = async () => {
  try {
    const res = await api.delete("api/discount/remove");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getDiscountInfo = async () => {
  try {
    const res = await api.get("api/discount/info");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { applyDiscount, removeDiscount, getDiscountInfo };
