// src/config/db.js
const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI is missing');

  // Masked log (tanpa bocorin password)
  try {
    const masked = uri.replace(/:\/\/(.*?):(.*?)@/, '://$1:****@');
    console.log('Connecting to MongoDB:', masked);
  } catch (_) {}

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10,
  });

  console.log('MongoDB connected successfully.');
}

module.exports = connectDB;
