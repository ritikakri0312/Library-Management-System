const Book = require('../models/Book');

// =======================
// GET all books
// =======================
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// ADD a new book
// =======================
const addBook = async (req, res) => {
  try {
    const { title, author, category, quantity } = req.body;

    const newBook = new Book({
      title,
      author,
      category,
      quantity   // <-- important
    });

    await newBook.save();
    res.status(201).json(newBook);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// =======================
// UPDATE a book (full update)
// =======================
const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        quantity: req.body.quantity   // <-- important
      },
      { new: true }
    );

    res.json(updatedBook);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// =======================
// DELETE a book
// =======================
const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getBooks, addBook, updateBook, deleteBook };
