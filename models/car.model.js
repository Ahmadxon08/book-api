const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Car title is required"],
    trim: true,
    maxLength: [100, "Title cannot exceed 100 characters"],
  },
  color: {
    type: String,
    required: [true, "Color is requiered"],
    trim: true,
  },
  year: {
    type: Number,
    requied: [true, "Year is required"],
    min: [0, "Year cannot be negative"],
    max: [new Date().getFullYear(), "Year cannot be in the future"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
