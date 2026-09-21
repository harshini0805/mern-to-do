require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_todo';

// ---- Middleware ----
app.use(cors());           // allow the React dev server to call this API
app.use(express.json());   // parse JSON request bodies

// ---- Routes ----
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/todos', todoRoutes);

// ---- Error handler (must come after routes) ----
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((e) => e.message).join(', ');
    return res.status(400).json({ message });
  }
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// ---- Connect to MongoDB, then start listening ----
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected:', MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
