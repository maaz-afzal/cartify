require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoute = require("./routes/authRoutes");
const productRoute = require("./routes/productRoutes");
const cartRoute = require("./routes/cartRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const adminRoutes = require("./routes/adminRoutes");
const discountRoutes = require("./routes/discountRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", authMiddleware, cartRoute);
app.use("/api/discount", authMiddleware, discountRoutes);
app.use("/api/favorites", authMiddleware, favoriteRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
