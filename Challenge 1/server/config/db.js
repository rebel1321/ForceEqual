const mongoose = require("mongoose");

// Function to connect to the MongoDB Database
const connectDB = async () => {
  mongoose.connection.on('connected', () => console.log('Database connected'));
  await mongoose.connect(`${process.env.MONGODB_URI}/Challenge1`);
};

module.exports = connectDB;  // Export using CommonJS syntax
