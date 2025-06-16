// backend/src/routes/expenses.js
const router  = require('express').Router();
const Expense = require('../models/expense');

// List all expenses
router.get('/', async (req, res) => {
  try {
    const all = await Expense.find().sort('-createdAt');
    res.json({ success: true, data: all });
  } catch (err) {
    console.error('Error listing expenses:', err);
    res.status(500).json({ success: false, message: err.message });
  }
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
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid expense ID' });
    }
    res.status(400).json({ success: false, message: err.message });
  }
});

// Mark an expense as settled
router.post('/:id/settle', async (req, res) => {
  try {
    const ex = await Expense.findById(req.params.id);
    if (!ex) return res.status(404).json({ success: false, message: 'Expense not found' });
    ex.settled = true;
    await ex.save();
    res.json({ success: true, data: ex, message: 'Expense marked as settled' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid expense ID' });
    }
    console.error('Error settling expense:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete an expense by ID
router.delete('/:id', async (req, res) => {
  try {
    const ex = await Expense.findByIdAndDelete(req.params.id);
    if (!ex) return res.status(404).json({ success: false, message: 'Expense not found' });
    res.json({ success: true, message: 'Expense deleted' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid expense ID' });
    }
    console.error('Error deleting expense:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Category summary
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
