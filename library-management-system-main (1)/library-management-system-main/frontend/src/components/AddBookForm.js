import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const AddBookForm = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    quantity: ''
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/books', book);
      alert('Book added successfully 📚');
      setBook({ title: '', author: '', quantity: '' });
    } catch (error) {
      alert('Error adding book!');
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center text-primary mb-4">
        <FontAwesomeIcon icon={faBook} className="me-2" />
        Add New Book
      </h3>

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={book.quantity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
