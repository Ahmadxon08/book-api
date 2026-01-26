const express = require("express");
const {
  getAllBooks,
  getBookById,
  deleteBook,
  createBook,
  updateBook,
} = require("../controllers/book.controller");

const router = express.Router();

router.get("/books", getAllBooks);
router.get("/books/:id", getBookById);
router.post("/books", createBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);
module.exports = router;
