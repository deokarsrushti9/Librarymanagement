const express = require('express');
const router = express.Router();
const { registerStudent, getAllStudents } = require('../controllers/studentController');
const pool = require('../config/db'); // your MySQL connection

// POST /api/students → register new student
router.post('/', registerStudent);

// GET /api/students → get all students
router.get('/', getAllStudents);

// DELETE /api/students/:id
router.delete('/:id', async (req, res) => {
  try {
    // First delete related issued_books records
    await pool.promise().query('DELETE FROM issued_books WHERE student_id = ?', [req.params.id]);

    // Then delete student
    const [result] = await pool.promise().query('DELETE FROM students WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student removed successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
