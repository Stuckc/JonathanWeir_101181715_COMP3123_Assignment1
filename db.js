const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect('mongodb://localhost:27017/comp3123_assignment1');
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
