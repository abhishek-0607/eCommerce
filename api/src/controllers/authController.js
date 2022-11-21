const User = require("../models/user");

const router = require("express").Router();

const bcrypt = require("bcryptjs");

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
    const isMatch = bcrypt.compare();

    return res.status(201).send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

module.exports = router;
