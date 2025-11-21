const express = require('express');
const router = express.Router();
const {
  addBook,
  getAllBooks,
  getBookAvailability  // ✅ import here
} = require('../controllers/booksController');

// POST /api/books (Add new book)
router.post('/', addBook);

// ✅ GET /api/books (Get all books)
router.get('/', getAllBooks);
router.get('/:isbn', getBookAvailability);

module.exports = router;
