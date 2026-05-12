import React from "react";
import Navbar from "../components/Navbar";
import { ShieldCheck, Truck, CreditCard, Sparkles } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      
      {/* navbar component */}
      <Navbar />

      {/* about header */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            About <span className="text-orange-500">Cartify</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Your trusted beauty & skincare store
          </p>
        </div>

        {/* about main */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
            alt="Beauty"
            className="rounded-xl shadow-md w-full h-80 object-cover"
          />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Our Mission
              </h2>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-3">
              We provide high-quality beauty and skincare products at affordable
              prices.
            </p>

            <p className="text-gray-600 dark:text-gray-400">
              Every product is carefully selected for our customers.
            </p>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Why Choose Us?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* about cards */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow text-center">
            <ShieldCheck className="mx-auto text-orange-500 mb-2" />
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Authentic Products
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              100% original items
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow text-center">
            <Truck className="mx-auto text-orange-500 mb-2" />
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Fast Delivery
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Quick & reliable shipping
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow text-center">
            <CreditCard className="mx-auto text-orange-500 mb-2" />
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Secure Payments
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Safe checkout system
            </p>
          </div>
        </div>

        {/* about footer */}
        <div className="text-center mt-12">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Our Commitment
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
            We focus on quality products and the best customer experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
