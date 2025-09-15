// src/server.js
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db'); // perhatikan: export default function dari db.js

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
})();
