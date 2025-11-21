const db = require('../config/db');

// Register a new student
const registerStudent = (req, res) => {
  let { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and Email are required' });
  }

  // Clean email (optional but recommended)
  email = email.trim().toLowerCase();

  const query = 'INSERT INTO students (name, email) VALUES (?, ?)';

  db.query(query, [name, email], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Email already exists' });
      }
      console.error('❌ Error inserting student:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    // Respond with new student's ID
    res.status(201).json({
      message: 'Student registered successfully',
      id: result.insertId,
    });
  });
};

// Get all students
const getAllStudents = (req, res) => {
  const query = 'SELECT id, name, email FROM students ORDER BY id DESC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error fetching students:', err);
      return res.status(500).json({ error: 'Failed to fetch students' });
    }

    res.status(200).json(results);
  });
};

module.exports = {
  registerStudent,
  getAllStudents,
};
