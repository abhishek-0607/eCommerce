const express = require("express");
const app = express();
app.use(express.json());
const userController = require("./src/controllers/userController");
const authController = require("./src/controllers/authController");

const productController = require("./src/controllers/productController");

app.use("/api/users", userController);
app.use("/api", authController);

app.use("/products", productController);

module.exports = app;
