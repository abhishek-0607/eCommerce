const express = require("express");
const {
  verifyAuthorization,
  verifyAdmin,
  verifyToken,
} = require("../middlewares/verifyToken");
const Order = require("../models/order");
const router = express.Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    return res.status(200).json(newOrder);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

//UPDATE
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    console.log(req.user);
    const upadatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).send(upadatedOrder);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

//DELETE
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    return res.status(200).json("Order has been deleted...");
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

//GET USER ORDERS
router.get("/find/:userId", verifyAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    return res.status(200).json(orders);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

// GET ALL
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find();

    return res.status(200).json(orders);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

//GET MONTHLY STATS

router.get("/income", verifyAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
      { $group: { _id: "$month", total: { $sum: "$sales" } } },
    ]);

    return res.status(200).json(income);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

module.exports = router;
