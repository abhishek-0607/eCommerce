const User = require("../models/user");

const router = require("express").Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

require("dotenv").config();

router.post("/register", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(500).json({
        message: "Please provide a different email",
        status: "failed",
      });
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});
router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(500).json({
        message: "Invalid Credentials",
        status: "failed",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(500).json({
        message: "Invalid Credentials",
        status: "failed",
      });
    }
    const token = jwt.sign(
      { id: user.id, idAdmin: user.isAdmin },
      process.env.KEY,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;
    return res.status(201).send({ ...others, token });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

module.exports = router;
