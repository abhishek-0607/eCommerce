const express = require("express");
const app = express();
app.use(express.json());
const userController = require("./src/controllers/userController");
const authController = require("./src/controllers/authController");

const productController = require("./src/controllers/productController");
const cartController = require("./src/controllers/cartController");
const orderController = require("./src/controllers/orderController");

app.use("/api/users", userController);
app.use("/api", authController);

app.use("/api/products", productController);
app.use("/api/carts", cartController);
app.use("/api/orders", orderController);

module.exports = app;
