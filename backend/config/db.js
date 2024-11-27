const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
    });
      console.log(`MongoDB connected: 
          PORT:${conn.connection.port}
          HOST:${conn.connection.host}`);
    
    conn.connection.on('error', (err) => {
      console.log(`MongoDB connection Error: ${err.message}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
