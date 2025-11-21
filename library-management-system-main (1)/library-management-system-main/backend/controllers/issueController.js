const db = require('../config/db');

// Issue a book
const issueBook = (req, res) => {
  const { student_id, book_id } = req.body;
  if (!student_id || !book_id) {
    return res.status(400).json({ error: 'Student and Book are required' });
  }

  const query = 'INSERT INTO issued_books (student_id, book_id, issue_date) VALUES (?, ?, CURDATE())';
  db.query(query, [student_id, book_id], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to issue book' });
    res.status(201).json({ message: 'Book issued successfully' });
  });
};

// Return a book
const returnBook = (req, res) => {
  const issueId = req.params.issue_id;
  const returnDate = new Date();

  db.query(
    'UPDATE issued_books SET return_date = ? WHERE id = ?',
    [returnDate, issueId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(200).json({ message: 'Book returned successfully' });
    }
  );
};

// Get all issued books for student
const getIssuedBooksByStudent = (req, res) => {
  const studentId = req.params.student_id;
  const query = `
    SELECT ib.id, b.title, ib.issue_date
    FROM issued_books ib
    JOIN books b ON ib.book_id = b.id
    WHERE ib.student_id = ? AND ib.return_date IS NULL
  `;
  db.query(query, [studentId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(200).json(results);
  });
};

// Get all currently issued (not returned) books
const getAllIssuedBooks = (req, res) => {
  const query = `
    SELECT 
      issued_books.id AS issue_id,
      students.name AS student_name,
      books.title AS book_title,
      issued_books.issue_date
    FROM issued_books
    JOIN students ON issued_books.student_id = students.id
    JOIN books ON issued_books.book_id = books.id
    WHERE issued_books.return_date IS NULL
    ORDER BY issued_books.issue_date DESC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch issued books' });
    res.status(200).json(results);
  });
};

module.exports = {
  issueBook,
  returnBook,
  getIssuedBooksByStudent,
  getAllIssuedBooks
};
