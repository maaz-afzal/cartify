import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Cart from "./pages/Cart.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import NotFound from "./pages/NotFound.jsx";
import About from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Favorites from "./pages/Favorites.jsx";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
