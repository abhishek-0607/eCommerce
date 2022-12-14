const express = require("express");
const {
  verifyAuthorization,
  verifyAdmin,
} = require("../middlewares/verifyToken");
const User = require("../models/user");
const router = express.Router();

//UPDATE USER
router.put("/:id", verifyAuthorization, async (req, res) => {
  try {
    console.log(req.user);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).send(updatedUser);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

//DELETE USER
router.delete("/:id", verifyAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("user has been deleted...");
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

//GET USER BY ID
router.get("/find/:id", verifyAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    // const { password, ...others } = user._doc;
    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

// GET ALL USERS
router.get("/", verifyAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ id: -1 }).limit(1)
      : await User.find().select("-password");
    // const { password, ...others } = user._doc;
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

//GET USER STATS
router.get("/stats", verifyAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);

    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});
module.exports = router;
