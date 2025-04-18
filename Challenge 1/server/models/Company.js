const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: String,
  matchScore: Number,
  status: { type: String, default: "Not Target" }
});

module.exports = mongoose.model("Company", companySchema);
