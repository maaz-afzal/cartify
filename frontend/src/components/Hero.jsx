import React from "react";

const Hero = () => {
  return (
    <section className="bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center py-16 lg:py-24">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Reveal Your Natural{" "}
              <span className="text-amber-600 dark:text-amber-500">Beauty</span>
            </h1>
            <p className="mt-5 text-gray-600 dark:text-gray-400 text-lg">
              Discover premium skincare and makeup products made for everyday
              beauty.
            </p>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80"
              alt="beauty product"
              className="w-full h-100 object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
