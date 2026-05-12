import api from "./api";

const signup = async (data) => {
  try {
    const res = await api.post("/api/auth/signup", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const login = async (data) => {
  try {
    const res = await api.post("/api/auth/login", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { signup, login };
