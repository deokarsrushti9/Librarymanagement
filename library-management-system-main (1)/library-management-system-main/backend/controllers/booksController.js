const db = require('../config/db');

// Issue a book to a student
const issueBook = (req, res) => {
  const { student_id, book_id } = req.body;

  if (!student_id || !book_id) {
    return res.status(400).json({ error: 'Student and Book are required' });
  }

  const query = 'INSERT INTO issued_books (student_id, book_id, issue_date) VALUES (?, ?, CURDATE())';
  db.query(query, [student_id, book_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to issue book' });
    res.status(201).json({ message: 'Book issued successfully' });
  });
};

// Return a book
const returnBook = (req, res) => {
  const { student_id, book_id } = req.body;

  if (!student_id || !book_id) {
    return res.status(400).json({ error: 'Student and Book are required' });
  }

  const query = 'DELETE FROM issued_books WHERE student_id = ? AND book_id = ? LIMIT 1';
  db.query(query, [student_id, book_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to return book' });
    res.status(200).json({ message: 'Book returned successfully' });
  });
};
const addBook = (req, res) => {
  const { title, author, quantity } = req.body;
  if (!title || !author || !quantity) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const sql = 'INSERT INTO books (title, author, quantity) VALUES (?, ?, ?)';
  db.query(sql, [title, author, quantity], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(201).json({ message: 'Book added successfully' });
  });
};
// Get all books
const getAllBooks = (req, res) => {
  const query = 'SELECT id, title, author, quantity FROM books';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(200).json(results);
  });
};

// Get availability by book ID
const getBookAvailability = (req, res) => {
  const { isbn } = req.params;

  const query = `
    SELECT 
      b.title,
      b.quantity AS total,
      (SELECT COUNT(*) FROM issued_books ib WHERE ib.book_id = b.id) AS issued,
      (b.quantity - (SELECT COUNT(*) FROM issued_books ib WHERE ib.book_id = b.id)) AS available
    FROM books b
    WHERE b.id = ?
  `;

  db.query(query, [isbn], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'Book not found' });

    res.status(200).json(results[0]);
  });
};


module.exports = {
  issueBook,
  returnBook,
  addBook,
  getAllBooks, 
  getBookAvailability 
};