// src/routes/userRoutes.js
const express = require('express');
const { getUsers, registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// GET /api/users
router.get('/', getUsers);

// POST /api/users/register
router.post('/register', registerUser);

// POST /api/users/login
router.post('/login', loginUser);

module.exports = router;
