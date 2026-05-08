require("dotenv").config();
const mongoose = require("mongoose");
require("./models/Product");

mongoose.set("strictQuery", false);

(async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  await mongoose.connection.db.dropDatabase();

  const res = await fetch("https://dummyjson.com/products");
  const { products } = await res.json();

  const validProducts = products.map((p, i) => ({
    name: p.title,
    description: p.description,
    price: p.price,
    discountPercentage: p.discountPercentage || 0,
    rating: p.rating,
    stock: p.stock,
    category: p.category,
    brand: p.brand || `Brand${i + 1}`,
    sku: `SKU${i + 1}`,
    images: [p.thumbnail],
    tags: p.tags || ["product"],
  }));

  await mongoose.model("Product").insertMany(validProducts);
  await mongoose.disconnect();
})();
