const Book = require("../models/book.model");
const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();
    if (allBooks?.length > 0) {
      res.status(200).json({
        success: true,
        message: "All books fechted Successfully",
        coundedBook: allBooks.length,
        data: allBooks,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "There is no book in book-store",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const singleBook = await Book.findById(bookId);
    if (!singleBook) {
      return res.status(404).json({
        success: false,
        message: "Book Not found, try a different ID",
      });
    }
    res.status(200).json({
      success: true,
      data: singleBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const createBook = async (req, res) => {
  try {
    const bookData = req.body;
    const newBook = await Book.create(bookData);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create book",
      error: error.message,
    });
  }
};
const updateBook = async (req, res) => {
  try {
    const book = req.body;
    const bookId = req.params.id;
    const updatedBook = await Book.findByIdAndUpdate(bookId, book, {
      new: true,
    });
    if (!updatedBook) {
      res.status(404).json({
        success: false,
        data: updatedBook,
        message: "Updated book not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create book",
      error: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Deleted Book Id not Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: error.message,
    });
  }
};
module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
