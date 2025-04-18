const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User");
const Company = require("./models/Company");

// Load env vars
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB and seed data
async function startServer() {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    await seedData();

    // Routes
    app.use("/login", require("./routes/auth"));
    app.use("/", require("./routes/account"));

    const PORT = process.env.PORT || 6000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Error starting server:", err);
  }
}

// Seeding data
async function seedData() {
  const usernames = ["user1", "user2", "user3"];
  for (const username of usernames) {
    const exists = await User.findOne({ username });
    if (!exists) {
      await User.create({ username, password: "pass123" });
      console.log(`✅ Created user: ${username}`);
    } else {
      console.log(`ℹ️ User ${username} already exists`);
    }
  }

  const companies = [
    { name: "Alpha Inc", matchScore: 85 },
    { name: "Beta Ltd", matchScore: 73 },
    { name: "Gamma Corp", matchScore: 92 },
    { name: "Delta Solutions", matchScore: 68 },
    { name: "Epsilon LLC", matchScore: 78 }
  ];

  for (const company of companies) {
    const exists = await Company.findOne({ name: company.name });
    if (!exists) {
      await Company.create(company);
      console.log(`✅ Created company: ${company.name}`);
    } else {
      console.log(`ℹ️ Company ${company.name} already exists`);
    }
  }
}

// Start the app
startServer();
