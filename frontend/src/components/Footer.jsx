import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Info, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import cartifyLogo from "../assets/cartify.png";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <img
                style={{ backgroundImage: `url(${cartifyLogo})` }}
                src={cartifyLogo}
                alt="cartify logo"
                className="w-13 object-cover"
              />
              <span className="bg-linear-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
                CARTIFY
              </span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Your trusted destination for quality beauty and skincare products.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition"
              >
                <FaTwitter size={18} />
              </a>
            </div>
          </div>

          {/* quick navigation links */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-500 dark:text-gray-400 hover:text-amber-500 transition text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-500 dark:text-gray-400 hover:text-amber-500 transition text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-500 dark:text-gray-400 hover:text-amber-500 transition text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="text-gray-500 dark:text-gray-400 hover:text-amber-500 transition text-sm"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* contact info */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                <Phone size={16} className="text-amber-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                <Mail size={16} className="text-amber-500" />
                <span>support@cartify.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                <MapPin size={16} className="text-amber-500" />
                <span>New York, USA</span>
              </li>
            </ul>
          </div>

          {/* newsletter */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
              Newsletter
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
              Subscribe for exclusive offers & updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              />
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-r-lg text-sm transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Cartify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
