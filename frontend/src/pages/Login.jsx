import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import authService from "../services/authService";

const InputField = ({ label, type, placeholder, id, value, onChange }) => {
  return (
    <div className="mt-4">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(formData);
      // Note: Ensure karein ke backend se 'user' aur 'token' aa raha ho
      login(response.user, response.token);

      navigate("/");
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-gray-100 dark:bg-gray-900">
      <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-2xl shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        {/* Left Side Image */}
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage: "url('./src/assets/side-panel-image.png')",
          }}
        ></div>

        {/* Right Side Form */}
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-20"
              src="./src/assets/cartify.png"
              alt="Cartify Logo"
            />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
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
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
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
