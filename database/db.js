const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();
const dbUrl = process.env.DB_URL || "";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};
module.exports = connectDB;
