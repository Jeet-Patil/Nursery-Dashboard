const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allow SPA to load scripts/styles
}));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : (process.env.CLIENT_URL || 'http://localhost:3000'),
  credentials: true
}));
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/plants', require('./routes/plantRoutes'));
app.use('/api/purchases', require('./routes/purchaseRoutes'));
app.use('/api/sells', require('./routes/sellRoutes'));
app.use('/api/damages', require('./routes/damageRoutes'));
app.use('/api/suppliers', require('./routes/supplierRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'dist')));

  // SPA fallback — any non-API route serves index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
} else {
  // 404 handler (dev only — in production, SPA handles unknown routes)
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found'
    });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
