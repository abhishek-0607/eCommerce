const express = require("express");
const router = express.Router();

router.get("/register", async (req, res) => {
  try {
    return res.status(200).send("new to do");
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "failed" });
  }
});
module.exports = router;
