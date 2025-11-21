const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const studentRoutes = require('./routes/studentRoutes');
const booksRoutes = require('./routes/booksRoutes');
const issueRoutes = require('./routes/issueRoutes');

// Route Mounting
app.use('/api/students', studentRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/issues', issueRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send({ message: 'Library Management System Backend is Running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
