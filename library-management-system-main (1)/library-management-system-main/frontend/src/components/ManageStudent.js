import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpenReader,
  faUndo,
  faTrash
} from '@fortawesome/free-solid-svg-icons';


function ManageStudent() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://localhost:5000/api/students')
      .then((res) => setStudents(res.data))
      .catch((err) => console.error('Error fetching students:', err));
  };

  const handleRemove = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this student?");
    if (confirmDelete) {
      axios.delete(`http://localhost:5000/api/students/${id}`)
        .then(() => {
          setStudents((prev) => prev.filter((s) => s.id !== id));
          setMessage("Student removed successfully");
          setTimeout(() => setMessage(''), 4000);
        })
        .catch((err) => {
          console.error('Error deleting student:', err);
          setMessage("Failed to remove student. Try again.");
          setTimeout(() => setMessage(''), 4000);
        });
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4 position-relative">
      {message && (
        <div className="popup-message">
          {message}
        </div>
      )}

      <h3 className="text-success mb-4">
        <FontAwesomeIcon icon={faBookOpenReader} className="me-2" />
        Already Registered Students
      </h3>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search student by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => navigate(`/students/${student.id}/issue`)}
                  >
                    <FontAwesomeIcon icon={faBookOpenReader} className="me-1" />
                    Issue Book
                  </button>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => navigate(`/students/${student.id}/return`)}
                  >
                    <FontAwesomeIcon icon={faUndo} className="me-1" />
                    Return Book
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(student.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="me-1" />
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageStudent;
