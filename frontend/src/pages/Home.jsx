import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import productService from "../services/productService";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const response = await productService.getProducts();
      setProduct(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
