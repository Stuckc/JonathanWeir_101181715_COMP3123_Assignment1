const express = require('express');
const Employee = require('../models/Employee'); // Import Employee model
const router = express.Router();

// Get all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create a new employee
router.post('/employees', async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json({
      message: 'Employee created successfully.',
      employee_id: newEmployee._id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get employee by ID
router.get('/employees/:eid', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update employee details
router.put('/employees/:eid', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    res.status(200).json({
      message: 'Employee details updated successfully.',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete employee
router.delete('/employees', async (req, res) => {
  try {
    const { eid } = req.query;
    const result = await Employee.findByIdAndDelete(eid);
    if (!result) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    res.status(204).json({
      message: 'Employee deleted successfully.',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
