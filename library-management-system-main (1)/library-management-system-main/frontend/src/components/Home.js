import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'animate.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div
        className="card p-4 shadow-lg rounded-4 animate__animated animate__fadeIn"
        style={{
          maxWidth: '500px', // limit width
          width: '100%',
          padding: '2rem'
        }}
      >
        <h2 className="mb-4 text-success text-center">
          <i className="fas fa-book-reader me-2" />
          Welcome to the Library System
        </h2>


        <button
          className="btn btn-primary w-100 mb-3 py-2"
          onClick={() => navigate('/register')}
        >
          <i className="fas fa-user-plus me-2" />
          New Student
        </button>

        <button
          className="btn btn-outline-success w-100 py-2"
          onClick={() => navigate('/students')}
        >
          <i className="fas fa-users me-2" />
          Already Registered
        </button>
      </div>
    </div>
  );
};

export default Home;
