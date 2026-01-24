import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxLength: [100, "Title cannot exceed 100 characters"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
    min: [0, "Year cannot be negative"],
    max: [new Date().getFullYear(), "Year cannot be in the future"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
