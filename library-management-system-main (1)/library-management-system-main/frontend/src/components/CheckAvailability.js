import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function CheckAvailability() {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [availability, setAvailability] = useState(null);

  // Fetch all books when component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/books') // ✅ Full backend URL
      .then(res => setBooks(res.data))
      .catch(err => console.error('Error fetching books:', err));
  }, []);

  const handleSelectChange = (e) => {
    const bookId = e.target.value;
    setSelectedBookId(bookId);

    if (bookId) {
      axios.get(`http://localhost:5000/api/books/${bookId}`) // ✅ Matches backend `/api/books/:id`
        .then(res => setAvailability(res.data))
        .catch(err => {
          console.error('Error fetching availability:', err);
          setAvailability(null); // clear on error
        });
    } else {
      setAvailability(null);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">
        <FontAwesomeIcon icon={faBookOpen} className="me-2" />
        Check Book Availability
      </h3>

      <div className="mb-4">
        <select
          className="form-select"
          onChange={handleSelectChange}
          value={selectedBookId}
        >
          <option value="">-- Select a Book --</option>
          {books.map(book => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
      </div>

      {availability && (
        <div className="card shadow-sm p-4">
          <h5>{availability.title}</h5>
          <p><FontAwesomeIcon icon={faBookOpen} className="me-2 text-primary" />Total Copies: {availability.total}</p>
          <p><FontAwesomeIcon icon={faTimesCircle} className="me-2 text-danger" />Issued: {availability.issued}</p>
          <p><FontAwesomeIcon icon={faCheckCircle} className="me-2 text-success" />Available: {availability.available}</p>
        </div>
      )}
    </div>
  );
}

export default CheckAvailability;
