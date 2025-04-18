const express = require("express");
const Company = require("../models/Company");
const auth = require("../middleware/auth");
const router = express.Router();

// Get all accounts
router.get("/accounts", auth, async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
});

// Update target status
router.post("/accounts/:id/status", auth, async (req, res) => {
  const { status } = req.body;
  const updated = await Company.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Company not found" });
  res.json(updated);
});

module.exports = router;
