import React from "react";

const Hero = () => {

  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center py-16 lg:py-24">
          {/* Content */}
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Reveal Your Natural <span className="text-amber-600">Beauty</span>
            </h1>

            <p className="mt-5 text-gray-600 text-lg">
              Discover premium skincare and makeup products made for everyday
              beauty.
            </p>
          </div>

          {/* Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80"
              alt="Beauty Products"
              className="w-full h-100 object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
