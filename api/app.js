const express = require("express");
const app = express();
app.use(express.json());
const userController = require("./src/controllers/userController");
const authController = require("./src/controllers/authController");

app.use("/api/users", userController);
app.use("/api", authController);

module.exports = app;
