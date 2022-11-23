const express = require("express");
const { authorize, verifyAdmin } = require("../middlewares/verifyToken");
const User = require("../models/user");
const router = express.Router();

//UPDATE USER
router.put("/:id", authorize, async (req, res) => {
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
router.delete(":id", authorize, async (req, res) => {
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
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    return res.status(200).json({ ...others });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});
module.exports = router;
