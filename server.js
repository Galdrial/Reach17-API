// 1. Load environment variables FIRST (before anything else)
require('dotenv').config();

// 2. Import modules
const app = require('./src/app');
const connectDB = require('./src/config/database');

// 3. Read PORT from .env (or use 3000 as default)
const PORT = process.env.PORT || 3000;

// 4. Function to start server
const startServer = async () => {
  try {
    // Connect to database FIRST
    await connectDB();

    // Then start server only if DB is connected
    app.listen(PORT, () => {
       console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    });

  } catch (error) {
    console.error('❌ Server startup error:', error.message);
    process.exit(1);
  }
};
// 5. Start the application
startServer();