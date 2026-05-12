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
  Heart,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { cartItems } = useContext(CartContext);
  const { isLoggedin, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCartDisplay = () => {
    navigate("/cart");
    setMobileMenuOpen(false); // Close mobile menu on navigation
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold shrink-0">
            <span className="bg-linear-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
              CARTIFY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Links */}
            <div className="flex items-center space-x-6 mr-4">
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition font-medium"
              >
                Contact
              </Link>
            </div>

            {/* Search Bar (Only if props are provided) */}
            {setSearchTerm && (
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1.5 border border-transparent focus-within:border-amber-500 transition-all">
                <Search
                  size={18}
                  className="text-gray-500 dark:text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm || ""}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none text-sm ml-2 w-40 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>
            )}

            {/* Icons & Actions */}
            <div className="flex items-center space-x-4 border-l pl-4 border-gray-200 dark:border-gray-700">
              <Link
                to="/favorites"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Favorites"
              >
                <Heart size={22} />
              </Link>

              <button
                onClick={toggleTheme}
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              <button
                className="relative text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={handleCartDisplay}
                aria-label="Shopping cart"
              >
                <ShoppingBag size={22} />
                {cartItems?.length > 0 && (
                  <span className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center transform translate-x-1 -translate-y-1">
                    {cartItems.length}
                  </span>
                )}
              </button>

              {/* User Auth Section */}
              {isLoggedin ? (
                <div className="flex items-center space-x-3 pl-2">
                  <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                    <User size={18} />
                    <span className="text-sm font-medium truncate max-w-25">
                      {user?.name || user?.email?.split("@")[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 transition p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3 pl-2">
                  <Link
                    to="/login"
                    className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition font-medium shadow-sm hover:shadow-md"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button & Icons */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link
              to="/favorites"
              className="text-gray-700 dark:text-gray-300 hover:text-amber-600 transition"
            >
              <Heart size={22} />
            </Link>

            <button
              className="relative text-gray-700 dark:text-gray-300"
              onClick={handleCartDisplay}
            >
              <ShoppingBag size={22} />
              {cartItems?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg absolute w-full left-0 z-40">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {/* Mobile Search */}
            {setSearchTerm && (
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                <Search
                  size={18}
                  className="text-gray-500 dark:text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm || ""}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none text-sm ml-2 flex-1 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>
            )}

            {/* Mobile Links */}
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="text-gray-700 dark:text-gray-300 py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={closeMobileMenu}
                className="text-gray-700 dark:text-gray-300 py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="text-gray-700 dark:text-gray-300 py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Contact
              </Link>

              {/* Theme Toggle in Mobile Menu */}
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition w-full text-left"
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
              </button>
            </div>

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              {!isLoggedin ? (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="text-center text-gray-700 dark:text-gray-300 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="text-center bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 px-2">
                    <User size={18} />
                    <span className="font-medium">
                      {user?.name || user?.email?.split("@")[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 text-red-600 dark:text-red-400 py-2 px-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
