import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

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

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
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
      const response = await authService.signup(formData);
      console.log("Signup successful:", response);
      navigate("/login");
    } catch (error) {
      console.log("Signup failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex w-full max-w-sm overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg lg:max-w-4xl transition-colors duration-300">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage: "url('./src/assets/side-panel-image.png')",
          }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-20"
              src="./src/assets/cartify.png"
              alt="Cartify Logo"
            />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-300">
            Create an Account
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            <InputField
              id="name"
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />

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
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-amber-500 rounded-lg hover:bg-amber-600 focus:outline-none focus:ring focus:ring-amber-300 focus:ring-opacity-50"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-400 dark:text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-gray-700 dark:text-gray-300 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
