import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import authService from "../services/authService";
import ToastNotification from "../components/ToastNotification";
import sidePanelImage from "../assets/side-panel-image.png";
import cartifyLogo from "../assets/cartify.png";

const InputField = ({ label, type, placeholder, id, value, onChange }) => {
  return (
    <div className="mt-4">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full px-4 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-amber-500 focus:ring-opacity-40 dark:focus:border-amber-500 focus:outline-none focus:ring focus:ring-amber-300 dark:focus:ring-amber-800 transition"
      />
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    if (toast) setToast("");
  };

  // handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // form validation
    if (!formData.email || !formData.password) {
      setToast("Both fields are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await authService.login(formData);
      if (response.token) {
        const userData = response.user || { email: formData.email };
        login(userData, response.token);
        setToast("Login successful!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setToast("No token received from backend");
      }
    } catch (error) {
      console.error("Login Failed:", error);
      setToast(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {toast && (
        <ToastNotification message={toast} onClose={() => setToast("")} />
      )}
      <div className="flex w-full max-w-sm overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg lg:max-w-4xl transition-colors duration-300">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{ backgroundImage: `url(${sidePanelImage})` }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-20"
              style={{ backgroundImage: `url(${cartifyLogo})` }}
              src={cartifyLogo}
              alt="Cartify Logo"
            />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-300">
            Welcome Back
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            <InputField
              id="email"
              label="Email Address"
              type="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="Your Password"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-amber-300 focus:ring-opacity-50 ${
                  loading
                    ? "bg-amber-400 cursor-not-allowed"
                    : "bg-amber-500 hover:bg-amber-600"
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-400 dark:text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-gray-700 dark:text-gray-300 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
