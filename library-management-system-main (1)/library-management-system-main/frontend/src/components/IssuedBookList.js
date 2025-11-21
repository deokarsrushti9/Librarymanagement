import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faUser,
  faCalendarAlt,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

function IssuedBookList() {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIssuedBooks = () => {
    axios.get('http://localhost:5000/api/issues')
      .then((res) => {
        // Sort newest issue first
        const sorted = res.data.sort(
          (a, b) => new Date(b.issue_date) - new Date(a.issue_date)
        );
        setIssuedBooks(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch issued books:', err);
        setError('Failed to fetch issued books');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchIssuedBooks(); // initial load
    const interval = setInterval(fetchIssuedBooks, 3000); // refresh every 3 sec
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading issued books...</p></div>;
  if (error) return <div className="container mt-5"><p className="text-danger">{error}</p></div>;

  return (
    <div className="container mt-5">
      <h3 className="text-primary mb-4">
        <FontAwesomeIcon icon={faBook} className="me-2" />
        All Issued Books
      </h3>

      {issuedBooks.length === 0 ? (
        <p>No books have been issued yet.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th><FontAwesomeIcon icon={faUser} className="me-2" />Student</th>
              <th><FontAwesomeIcon icon={faBook} className="me-2" />Book</th>
              <th><FontAwesomeIcon icon={faCalendarAlt} className="me-2" />Issued Date</th>
              <th><FontAwesomeIcon icon={faCheckCircle} className="me-2" />Returned?</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((book) => (
              <tr key={book.issue_id}>
                <td>{book.student_name}</td>
                <td>{book.book_title}</td>
                <td>{new Date(book.issue_date).toLocaleDateString()}</td>
                <td>
                  {book.return_date
                    ? new Date(book.return_date).toLocaleDateString()
                    : <span className="text-danger"><FontAwesomeIcon icon={faTimesCircle} /> Not returned</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default IssuedBookList;
