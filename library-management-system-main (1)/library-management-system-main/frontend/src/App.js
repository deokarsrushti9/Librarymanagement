import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faBars,
  faPlusCircle,
  faEye,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
//import StudentForm from './components/StudentForm';
import BookList from './components/BookList';
import IssueBookForm from './components/IssueBookForm';
import StudentRegister from './components/StudentRegister';
import ManageStudent from './components/ManageStudent';
import AddBookForm from './components/AddBookForm';
import ReturnBook from './components/ReturnBook';
import ViewIssuedBooks from './components/ViewIssuedBooks';
import IssuedBookList from './components/IssuedBookList';
import CheckAvailability from './components/CheckAvailability';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <FontAwesomeIcon icon={faBook} className="me-2" />
            Library System
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/add-book">
                  <FontAwesomeIcon icon={faPlusCircle} className="me-2 text-success" />
                  Add New Book
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/issued-books">
                  <FontAwesomeIcon icon={faEye} className="me-2 text-primary" />
                  View Issued Books
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/check-availability">
                  <FontAwesomeIcon icon={faSearch} className="me-2 text-warning" />
                  Check Book Availability
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/students" element={<ManageStudent />} />
        <Route path="/students/:id/issue" element={<IssueBookForm />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/issue-book" element={<IssueBookForm />} />
        <Route path="/add-book" element={<AddBookForm />} />
        <Route path="/return-book" element={<ReturnBook />} />
        <Route path="/issued-books" element={<IssuedBookList />} />
        <Route path="/students/:id/return" element={<ReturnBook />} />
        <Route path="/check-availability" element={<CheckAvailability />} />
        <Route path="/view-issued-books" element={<ViewIssuedBooks />} />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
      />
    </Router>
  );
}

export default App;
