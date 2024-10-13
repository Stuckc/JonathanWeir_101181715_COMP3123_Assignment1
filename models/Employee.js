const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
  email: { 
    type: String, 
    required: true, // Make email a required field
    unique: true // Ensure that emails are unique
  },
});

// Create the Employee model
const Employee = mongoose.model('Employee', employeeSchema);

// Export the model
module.exports = Employee;
