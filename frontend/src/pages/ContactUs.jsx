import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ToastNotification from "../components/ToastNotification";

import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [toast, setToast] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setToast("Please fill all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      setToast("Invalid email address");
      return;
    }

    setToast("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Contact <span className="text-orange-500">Us</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            We are here to help you anytime
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-5 text-gray-800 dark:text-white">
              Contact Info
            </h2>

            <div className="space-y-5">
              <div className="flex gap-3 items-start">
                <Mail className="text-orange-500 mt-1" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    Email
                  </p>
                  <p className="text-sm text-gray-500">support@cartify.com</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Phone className="text-orange-500 mt-1" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    Phone
                  </p>
                  <p className="text-sm text-gray-500">+1 555 123 4567</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <MapPin className="text-orange-500 mt-1" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    Address
                  </p>
                  <p className="text-sm text-gray-500">New York, USA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-5 text-gray-800 dark:text-white">
              Send Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300">
                  Name
                </label>
                <input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full mt-1 border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full mt-1 border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="5"
                  className="w-full mt-1 border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded flex items-center justify-center gap-2 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {toast && (
          <ToastNotification message={toast} onClose={() => setToast("")} />
        )}
      </div>
    </div>
  );
};

export default ContactUs;
