import React from "react";
import SearchBar from "./SearchBar";

const Hero = ({ searchTerm, setSearchTerm }) => {
  return (
    <section className="bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center py-16 sm:py-20 lg:py-28">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Reveal Your Natural{" "}
            <span className="text-amber-600 dark:text-amber-500">Beauty</span>
          </h1>

          <p className="mt-5 max-w-2xl text-gray-600 dark:text-gray-400 text-base sm:text-lg">
            Discover premium skincare and makeup products designed for everyday
            elegance and confidence.
          </p>

          <div className="mt-10 w-full max-w-lg">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Search products, brands, categories..."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
