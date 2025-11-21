import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentRegister() {
  const [student, setStudent] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [registeredStudentId, setRegisteredStudentId] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/students', student);

      setIsError(false);
      setMessage('Student registered successfully!');
      setRegisteredStudentId(res.data.id); // ✅ Get the new student ID

      setStudent({ name: '', email: '' });
    } catch (err) {
      console.error(err);
      setIsError(true);
      setMessage(
        err.response?.data?.error || 'Registration failed.'
      );
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-primary mb-4">
        <i className="fas fa-user-plus me-2" /> Register New Student
      </h3>

      {message && (
        <div className={`alert ${isError ? 'alert-danger' : 'alert-success'} d-flex align-items-center`}>
          <i className={`fas ${isError ? 'fa-times-circle' : 'fa-check-circle'} me-2`} />
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          <i className="fas fa-paper-plane me-2" /> Register
        </button>
      </form>

      {registeredStudentId && (
        <div className="mt-4">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/students/${registeredStudentId}/issue`)}
          >
            <i className="fas fa-book me-2" />
            Issue Book to this Student
          </button>
        </div>
      )}
    </div>
  );
}

export default StudentRegister;
