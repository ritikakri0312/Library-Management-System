const express = require('express');
const router = express.Router();

const {
  getBooks,
  addBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

// Routes
router.get('/', getBooks);              // GET all books
router.post('/', addBook);              // ADD book
router.put('/:id', updateBook);         // UPDATE book (title/author/category/quantity)
router.delete('/:id', deleteBook);      // DELETE book

module.exports = router;
