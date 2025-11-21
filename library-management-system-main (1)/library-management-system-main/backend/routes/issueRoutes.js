const express = require('express');
const router = express.Router();

const {
  issueBook,
  getIssuedBooksByStudent,
  returnBook,
  getAllIssuedBooks
} = require('../controllers/issueController');

router.post('/', issueBook);
router.get('/:student_id', getIssuedBooksByStudent);
router.post('/return/:issue_id', returnBook);
router.get('/', getAllIssuedBooks);

module.exports = router;
