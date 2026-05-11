import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Moon,
  Sun,
  User,
  LogOut,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { cartItems } = useContext(CartContext);
  const { isLoggedin, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCartDisplay = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            <span className="bg-linear-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
              CARTIFY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition"
            >
              Products
            </Link>

            {/* Search Bar */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1.5">
              <Search size={18} className="text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-sm ml-2 w-40 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* User Menu */}
            {isLoggedin ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <User size={18} />
                  <span className="text-sm">
                    {user?.name || user?.email?.split("@")[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 transition"
                  aria-label="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Cart Button */}
            <button
              className="relative text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition"
              onClick={handleCartDisplay}
              aria-label="Shopping cart"
            >
              <ShoppingBag size={22} />
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {cartItems?.length || 0}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button
              className="relative text-gray-700 dark:text-gray-300"
              onClick={handleCartDisplay}
            >
              <ShoppingBag size={22} />
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 px-4 shadow-lg transition-colors duration-300">
          <div className="flex flex-col space-y-4">
            {/* 👇 CHANGE 3: Mobile search - value and onChange add karo */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2">
              <Search size={18} className="text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-sm ml-2 flex-1 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>

            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 dark:text-gray-300 py-2 hover:text-amber-600 dark:hover:text-amber-500 transition"
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 dark:text-gray-300 py-2 hover:text-amber-600 dark:hover:text-amber-500 transition"
            >
              Products
            </Link>

            {!isLoggedin ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 dark:text-gray-300 py-2 hover:text-amber-600 dark:hover:text-amber-500 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-amber-500 text-white px-4 py-2 rounded-lg text-center hover:bg-amber-600 transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <div className="text-gray-700 dark:text-gray-300 py-2 flex items-center space-x-2">
                  <User size={18} />
                  <span>{user?.name || user?.email?.split("@")[0]}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-red-600 dark:text-red-400 py-2 text-left hover:text-red-700 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
