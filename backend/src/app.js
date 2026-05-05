const express = require("express");
const authRoute = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/authMiddleware")
const productRoute = require("./routes/productRoutes");
const cartRoute = require("./routes/cartRoutes")
const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", authMiddleware, cartRoute )

module.exports = app;
