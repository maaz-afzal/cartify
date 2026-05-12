const express = require("express");
const authRoute = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const productRoute = require("./routes/productRoutes");
const cartRoute = require("./routes/cartRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", authMiddleware, cartRoute);
app.use("/api/favorites", favoriteRoutes);

module.exports = app;
