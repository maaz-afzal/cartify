import React, { useEffect, useState, useMemo } from "react";
import productService from "../services/productService";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  // pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory, selectedBrand]);

  useEffect(() => {
    const params = {
      page,
      limit: 10,
      search: searchTerm,
      category: selectedCategory,
      brand: selectedBrand,
    };

    productService.getProducts(params).then((data) => {
      setAllProducts(data.products);
      setTotalPages(data.pagination.pages);
    });
  }, [page, searchTerm, selectedCategory, selectedBrand]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (selectedCategory !== "All") {
      result = result.filter(
        (p) =>
          p.category === selectedCategory || p.tags?.includes(selectedCategory),
      );
    }

    if (selectedBrand !== "All") {
      if (selectedBrand === "No Brand") {
        result = result.filter((p) => !p.brand);
      } else {
        result = result.filter((p) => p.brand === selectedBrand);
      }
    }

    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(lower) ||
          p.category?.toLowerCase().includes(lower) ||
          p.brand?.toLowerCase().includes(lower) ||
          p.description?.toLowerCase().includes(lower) ||
          p.tags?.some((t) => t.toLowerCase().includes(lower)),
      );
    }

    if (sortOrder === "az") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sortOrder === "za") {
      result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    }

    return result;
  }, [allProducts, selectedCategory, selectedBrand, searchTerm, sortOrder]);

  const uniqueCategories = useMemo(
    () => [
      "All",
      ...new Set(
        allProducts.map((p) => p.category || p.tags?.[0]).filter(Boolean),
      ),
    ],
    [allProducts],
  );

  const uniqueBrands = useMemo(
    () => [
      "All",
      "No Brand",
      ...new Set(
        allProducts
          .map((p) => p.brand)
          .filter((b) => {
            if (!b) return false;
            const num = parseInt(b.replace(/\D/g, ""));
            return !(
              b.toLowerCase().includes("brand") &&
              num >= 16 &&
              num <= 30
            );
          }),
      ),
    ],
    [allProducts],
  );

  const selectClass =
    "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2 transition-colors outline-none cursor-pointer";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 max-w-7xl mx-auto rounded-2xl shadow-sm transition-colors duration-300 mt-5">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Category:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={selectClass}
            >
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Brand:
            </span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className={selectClass}
            >
              {uniqueBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Sort By:
            </span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className={selectClass}
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
          <div className="text-center py-20 text-gray-500 dark:text-gray-400 italic">
            {searchTerm ? (
              <>
                No products found matching "
                <span className="font-semibold">{searchTerm}</span>"
              </>
            ) : (
              "No products found matching the filters."
            )}
          </div>
        )}
      </div>

      {/* pagination */}
      <div className="flex justify-center items-center gap-4 pb-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-1 bg-amber-500 text-white rounded disabled:bg-gray-300 transition-colors disabled:cursor-not-allowed"
        >
          Prev
        </button>

        <span className="text-sm font-bold dark:text-white">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-1 bg-amber-500 text-white rounded disabled:bg-gray-300 transition-colors disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
