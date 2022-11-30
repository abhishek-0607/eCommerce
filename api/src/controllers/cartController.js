const express = require("express");
const {
  verifyAuthorization,
  verifyAdmin,
  verifyToken,
} = require("../middlewares/verifyToken");
const Cart = require("../models/cart");
const router = express.Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
  try {
    const newCart = await Cart.create(req.body);
    return res.status(200).json(newCart);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

//UPDATE
router.put("/:id", verifyAuthorization, async (req, res) => {
  try {
    console.log(req.user);
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).send(updatedCart);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

//DELETE
router.delete("/:id", verifyAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).json("cart has been deleted...");
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

//GET USER PRODUCT
router.get("/find/:userId", verifyAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    return res.status(200).json(cart);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

// GET ALL
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();

    return res.status(200).json(carts);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

module.exports = router;
