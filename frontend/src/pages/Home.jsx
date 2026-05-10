import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import productService from "../services/productService";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  // fetch products
  useEffect(() => {
    productService
      .getProducts()
      .then((data) => {
        setAllProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error loading products:", error));
  }, []);

  useEffect(() => {
    let result = [...allProducts];

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (p) =>
          p.category === selectedCategory || p.tags?.includes(selectedCategory),
      );
    }

    // Brand Filter
    if (selectedBrand !== "All") {
      if (selectedBrand === "No Brand") {
        result = result.filter((p) => !p.brand);
      } else {
        result = result.filter((p) => p.brand === selectedBrand);
      }
    }

    // Sorting
    if (sortOrder === "az") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sortOrder === "za") {
      result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    }

    setFilteredProducts(result);
  }, [selectedCategory, selectedBrand, sortOrder, allProducts]);

  const uniqueCategories = [
    "All",
    ...new Set(
      allProducts.map((p) => p.category || p.tags?.[0]).filter(Boolean),
    ),
  ];

  const uniqueBrands = [
    "All",
    "No Brand",
    ...new Set(
      allProducts
        .map((p) => p.brand)
        .filter((b) => {
          if (!b) return false;
          const num = parseInt(b.replace(/\D/g, ""));
          const isBrandStr = b.toLowerCase().includes("brand");
          return !(isBrandStr && num >= 16 && num <= 30);
        }),
    ),
  ];

  return (
    <div>
      <Navbar />
      <Hero />

      {/* Filter Section */}
      <div className="bg-gray-50 dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700 max-w-7xl mx-auto rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-6">
          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Category:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2 transition-colors dark:text-white outline-none cursor-pointer"
            >
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Brand:
            </span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2 transition-colors dark:text-white outline-none cursor-pointer"
            >
              {uniqueBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Sort By:
            </span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2 transition-colors dark:text-white outline-none cursor-pointer"
            >
              <option value="default">Default</option>
              <option value="az">Name (A-Z)</option>
              <option value="za">Name (Z-A)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500 italic">
            No products found matching the filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
