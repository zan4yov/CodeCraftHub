// src/controllers/userController.js
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// GET /api/users -> list users
async function getUsers(req, res) {
  try {
    const users = await User.find().select('-password').lean();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// POST /api/users/register -> create user
async function registerUser(req, res) {
  try {
    const { username, email, password, fullName } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'username, email, and password are required' });
    }

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return res.status(409).json({ message: 'Email or username already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashed,
      fullName: fullName || ''
    });

    const safeUser = user.toObject();
    delete safeUser.password;

    return res.status(201).json(safeUser);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// POST /api/users/login -> basic login
async function loginUser(req, res) {
  try {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password) {
      return res.status(400).json({ message: 'emailOrUsername and password are required' });
    }

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const safeUser = user.toObject();
    delete safeUser.password;

    return res.json({ user: safeUser });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = { getUsers, registerUser, loginUser };
