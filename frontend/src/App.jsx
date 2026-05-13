import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Cart from "./pages/Cart.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import NotFound from "./pages/NotFound.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Favorites from "./pages/Favorites.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Routes>
      {/* Home with Layout */}
      <Route
        path="/"
        element={
          <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
            <Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </Layout>
        }
      />

      {/* About with Layout */}
      <Route
        path="/about"
        element={
          <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
            <AboutUs />
          </Layout>
        }
      />

      {/* Contact with Layout */}
      <Route
        path="/contact"
        element={
          <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
            <ContactUs />
          </Layout>
        }
      />

      {/* Favorites with Layout */}
      <Route
        path="/favorites"
        element={
          <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
            <Favorites />
          </Layout>
        }
      />

      {/* Cart - Direct (has its own Navbar) */}
      <Route path="/cart" element={<Cart />} />

      {/* Auth pages - No Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Other routes */}
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
