import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faUser, faBook, faCheckCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function ReturnBook() {
  const { id } = useParams(); // student ID from URL
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch student info
  useEffect(() => {
    axios.get(`http://localhost:5000/api/students`)
      .then(res => {
        const found = res.data.find(s => s.id === parseInt(id));
        setStudent(found);
      })
      .catch(err => console.error(err));
  }, [id]);

  // Fetch issued books
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/issues/${id}`)
        .then(res => {
          if (Array.isArray(res.data)) {
            setIssuedBooks(res.data);
          } else {
            console.error("Invalid issued books response", res.data);
          }
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleReturn = (issueId) => {
    axios.post(`http://localhost:5000/api/issues/return/${issueId}`)
      .then(() => {
        setMessage('Book returned successfully!');
        setIssuedBooks(prev => prev.filter(b => b.id !== issueId));
      })
      .catch(() => {
        setMessage('Error returning book.');
      });
  };

  return (
    <div className="container mt-5">
      <h3 className="text-primary mb-4">
        <FontAwesomeIcon icon={faUndo} className="me-2" /> Return Book
      </h3>

      {student && (
        <h5 className="mb-4">
          <FontAwesomeIcon icon={faUser} className="me-2" />
          Returning for: <span className="text-success">{student.name}</span>
        </h5>
      )}

      {message && (
        <div className="alert alert-success d-flex justify-content-between align-items-center">
          <div>
            <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
            {message}
          </div>
          <button className="btn btn-sm btn-outline-success" onClick={() => setMessage('')}>OK</button>
        </div>
      )}

      {issuedBooks.length > 0 ? (
        <div>
          <h5 className="mb-3">
            <FontAwesomeIcon icon={faBook} className="me-2" />
            Issued Books
          </h5>
          <ul className="list-group">
            {issuedBooks.map(book => (
              <li key={book.id} className="list-group-item d-flex justify-content-between align-items-center">
                {book.title}
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleReturn(book.id)}
                >
                  <FontAwesomeIcon icon={faUndo} className="me-1" /> Return
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-muted">No books to return.</p>
      )}

      <button className="btn btn-outline-secondary mt-4" onClick={() => navigate('/students')}>
        <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
        Back to Students
      </button>
    </div>
  );
}

export default ReturnBook;
