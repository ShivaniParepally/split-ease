
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/splitease';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Make sure models are registered before routes
require('./src/api/models/User');
require('./src/api/models/Group');
require('./src/api/models/Expense');

// Authentication routes
app.use('/api/auth', require('./src/api/routes/auth'));

// Protected routes
const authMiddleware = require('./src/api/middleware/auth');
app.use('/api/users', authMiddleware, require('./src/api/routes/users'));
app.use('/api/groups', authMiddleware, require('./src/api/routes/groups'));
app.use('/api/expenses', authMiddleware, require('./src/api/routes/expenses'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
