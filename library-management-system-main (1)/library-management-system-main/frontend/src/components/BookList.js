// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then((res) => setBooks(res.data))
      .catch((err) => console.error('Error fetching books:', err));
  }, []);

  return (
    <div className="container mt-5"><h2 className="text-center text-primary mb-4">
  <i className="fas fa-book me-2" />
  Book List
</h2>
<h2 className="text-center text-primary mb-4">📚 Book List</h2>
      <table className="table table-bordered table-hover">
        <thead className="bg-info text-white">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr><td colSpan="4" className="text-center">No books found.</td></tr>
          ) : (
            books.map((book, index) => (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.quantity}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
