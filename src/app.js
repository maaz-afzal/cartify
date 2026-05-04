const express = require("express");
const authRoute = require("./routes/authRoutes");
const productRoute = require("./routes/productRoutes");
const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

module.exports = app;
