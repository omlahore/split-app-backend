// src/routes/expenses.js
const router  = require('express').Router();
const Expense = require('../models/expense');

// List all expenses
router.get('/', async (req, res) => {
  const all = await Expense.find().sort('-createdAt');
  res.json({ success: true, data: all });
});

// Add a new expense
router.post('/', async (req, res) => {
  try {
    const ex = await Expense.create(req.body);
    res.status(201).json({
      success: true,
      data: ex,
      message: 'Expense added successfully'
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update an expense by ID
router.put('/:id', async (req, res) => {
  try {
    const ex = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ex) return res.status(404).json({ success: false, message: 'Expense not found' });
    res.json({ success: true, data: ex });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Delete an expense by ID
router.delete('/:id', async (req, res) => {
  const ex = await Expense.findByIdAndDelete(req.params.id);
  if (!ex) return res.status(404).json({ success: false, message: 'Expense not found' });
  res.json({ success: true, message: 'Expense deleted' });
});

router.get('/categories', async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $project: { category: '$_id', totalAmount: 1, count: 1, _id: 0 } }
    ]);
    res.json({ success: true, data: summary });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
