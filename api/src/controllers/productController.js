const express = require("express");
const {
  verifyAuthorization,
  verifyAdmin,
} = require("../middlewares/verifyToken");
const Product = require("../models/product");
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    return res.status(200).json(newProduct);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

//UPDATE
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    console.log(req.user);
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).send(updatedProduct);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

//DELETE
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json("product has been deleted...");
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    return res.status(200).json(products);
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
