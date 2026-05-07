import api from "./api";

// Function to signup
const signup = async (data) => {
  try {
    const res = await api.post("/api/auth/signup", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Function to login
const login = async (data) => {
  try {
    const res = await api.post("/api/auth/login", data);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { signup, login };
