const getAllBooks = async (req, res) => {
  res.send("Get all books");
};
const getBookById = async (req, res) => {
  res.send(`Get book with ID ${req.params.id}`);
};
const createBook = async (req, res) => {
  res.send("Create a new book");
};
const updateBook = async (req, res) => {
  res.send(`Update book with ID ${req.params.id}`);
};

const deleteBook = async (req, res) => {
  res.send(`Delete book with ID ${req.params.id}`);
};
export { getAllBooks, getBookById, createBook, updateBook, deleteBook };
