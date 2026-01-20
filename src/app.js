// 1. Import Express and middleware
const express = require('express');
const cors = require('cors');
// 2. Create Express application
const app = express();
// ============================================
// 3. MIDDLEWARE
// ============================================
// CORS - Allow requests from other domains
app.use(cors());
// JSON Parser - Parse JSON body to JavaScript objects
app.use(express.json());
// URL-encoded Parser - Handle HTML form data
app.use(express.urlencoded({ extended: true }));
// ============================================
// 4. ROUTES
// ============================================
// Health check endpoint (test that API is running)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Reach17 API is running! 🚀',
    timestamp: new Date().toISOString()
  });
});
// Main routes (we'll create these later)
// app.use('/api/course-types', require('./routes/courseTypes'));
// app.use('/api/courses', require('./routes/courses'));
// app.use('/api/universities', require('./routes/universities'));
// ============================================
// 5. ERROR HANDLING
// ============================================
// 404 - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});
// Global error handler
// NOTE: MUST have 4 parameters (err, req, res, next)
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});
// 6. Export app
module.exports = app;