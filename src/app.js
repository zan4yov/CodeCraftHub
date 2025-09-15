// src/app.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// Root info
app.get('/', (req, res) => {
  res.send('User Management Service is running. Try GET /api/users');
});

// Mount all user routes at /api/users
app.use('/api/users', userRoutes);

module.exports = app;
