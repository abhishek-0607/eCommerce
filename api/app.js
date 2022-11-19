const express = require("express");
const connect = require("./src/configs/db");
const app = express();
app.use(express.json());

module.exports = app;
