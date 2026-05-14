import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  placeholder = "Search products...",
}) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          px-5 py-3 pl-12
          rounded-full
          border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-900
          text-gray-900 dark:text-white
          placeholder-gray-400
          focus:outline-none
          focus:ring-2 focus:ring-amber-500
          focus:border-amber-500
          transition-all duration-200
          shadow-sm
        "
      />

      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        size={20}
      />
    </div>
  );
};

export default SearchBar;
