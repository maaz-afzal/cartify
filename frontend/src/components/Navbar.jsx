import React, { useState } from "react";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleCartDisplay = () => {
    navigate("/cart");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold">
            <span className="bg-linear-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
              CARTIFY
            </span>
          </h1>

          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button
                onClick={() => setShopOpen(!shopOpen)}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-amber-600"
              >
                <span>Shop</span>
                <ChevronDown
                  size={16}
                  className={`${shopOpen ? "rotate-180" : ""}`}
                />
              </button>
              {shopOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700"
                  >
                    All Products
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700"
                  >
                    New Arrivals
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700"
                  >
                    Best Sellers
                  </a>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-amber-600"
              >
                <span>Categories</span>
                <ChevronDown
                  size={16}
                  className={`${categoriesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {categoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700"
                  >
                    Makeup
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700"
                  >
                    Skincare
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700"
                  >
                    Fragrance
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700"
                  >
                    Hair Care
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700"
                  >
                    Tools
                  </a>
                </div>
              )}
            </div>

            <a
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:text-amber-600"
            >
              Sale
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1.5">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm ml-2 w-40 dark:text-white"
              />
            </div>

            <button className="md:hidden text-gray-700 dark:text-gray-300">
              <Search size={20} />
            </button>

            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 hover:text-amber-600"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button
              className="relative text-gray-700 dark:text-gray-300 hover:text-amber-600"
              onClick={handleCartDisplay}
            >
              <ShoppingBag size={22} />
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 dark:text-gray-300"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t py-4 px-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none text-sm ml-2 flex-1 dark:text-white"
              />
            </div>

            <button
              onClick={() => setShopOpen(!shopOpen)}
              className="flex items-center justify-between text-gray-700 dark:text-gray-300 py-2"
            >
              <span>Shop</span>
              <ChevronDown
                size={16}
                className={`${shopOpen ? "rotate-180" : ""}`}
              />
            </button>
            {shopOpen && (
              <div className="pl-4 flex flex-col space-y-2">
                <a href="#" className="text-gray-600 dark:text-gray-400">
                  All Products
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400">
                  New Arrivals
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400">
                  Best Sellers
                </a>
              </div>
            )}

            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="flex items-center justify-between text-gray-700 dark:text-gray-300 py-2"
            >
              <span>Categories</span>
              <ChevronDown
                size={16}
                className={`${categoriesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {categoriesOpen && (
              <div className="pl-4 flex flex-col space-y-2">
                <a href="#" className="text-gray-600 dark:text-gray-400">
                  Makeup
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400">
                  Skincare
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400">
                  Fragrance
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400">
                  Hair Care
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400">
                  Tools
                </a>
              </div>
            )}

            <a href="#" className="text-gray-700 dark:text-gray-300 py-2">
              Sale
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
