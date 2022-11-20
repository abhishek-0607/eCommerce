const express = require("express");
const connect = require("./src/configs/db");
const app = express();
app.use(express.json());
const userController = require("./src/controllers/userController");
const authController = require("./src/controllers/authController");

app.use("/api", userController);
app.use("/api", authController);

module.exports = app;
