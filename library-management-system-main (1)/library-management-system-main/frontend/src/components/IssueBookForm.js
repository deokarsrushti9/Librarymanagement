import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faArrowLeft,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

function IssueBookForm() {
  const { id: studentId } = useParams();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [student, setStudent] = useState(null);

  // 🔹 Fetch available books
  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then((res) => {
        console.log('Fetched books:', res.data); // 🔍 Debug log
        setBooks(res.data);
      })
      .catch((err) => console.error('Failed to load books:', err));
  }, []);

  // 🔹 Fetch student details
  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then((res) => {
        const found = res.data.find((s) => s.id === parseInt(studentId));
        setStudent(found || null);
      })
      .catch((err) => console.error('Failed to fetch student:', err));
  }, [studentId]);

  // 🔹 Handle book issue
  const handleIssue = () => {
    if (!selectedBookId) {
      alert('❗ Please select a book to issue.');
      return;
    }

    axios.post('http://localhost:5000/api/issues', {
      student_id: studentId,
      book_id: selectedBookId
    })
    .then(() => {
      toast.success(
        <span>
          
          Book issued successfully!
        </span>
      );
      navigate('/students');
    })
    .catch((err) => {
      console.error(err);
      toast.error(
        <span>
          <FontAwesomeIcon icon={faTimesCircle} className="me-2 text-danger" />
          Failed to issue the book.
        </span>
      );
    });
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-success">
        <FontAwesomeIcon icon={faBook} className="me-2" />
        Issue Book to {student ? student.name : `Student #${studentId}`}
      </h3>

      <div className="mb-3">
        <label htmlFor="bookSelect" className="form-label">Select Book:</label>
        <select
          id="bookSelect"
          className="form-select"
          value={selectedBookId}
          onChange={(e) => setSelectedBookId(e.target.value)}
        >
          <option value="">-- Choose a Book --</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title} by {book.author}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary me-2" onClick={handleIssue}>
        <FontAwesomeIcon icon={faCheckCircle} className="me-1" />
        Issue Book
      </button>

      <button className="btn btn-secondary" onClick={() => navigate('/students')}>
        <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
        Back to Students
      </button>
    </div>
  );
}

export default IssueBookForm;
