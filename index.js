const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const employeeRoutes = require('./routes/employeeRoutes'); // Import employee routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/comp3123_assignment1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Use routes
app.use('/api/v1/user', userRoutes); // Use user routes
app.use('/api/v1/emp', employeeRoutes); // Use employee routes

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
