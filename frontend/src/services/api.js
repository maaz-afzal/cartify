import axios from "axios";

const url = import.meta.env.VITE_API_URL || "http://localhost:3000";

// create an axios instance
const api = axios.create({
  baseURL: url,
  credentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// add a request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
