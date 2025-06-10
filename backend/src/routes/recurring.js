const express = require('express');
const router  = express.Router();
const Recurring = require('../models/recurringExpense');

// Create a recurring template
// POST /recurring
router.post('/', async (req, res) => {
  try {
    const rec = await Recurring.create(req.body);
    res.status(201).json({ success:true, data:rec });
  } catch(err) {
    res.status(400).json({ success:false, message: err.message });
  }
});

// List all recurring templates
// GET /recurring
router.get('/', async (_, res) => {
  const list = await Recurring.find();
  res.json({ success:true, data:list });
});

// Delete a recurring template
// DELETE /recurring/:id
router.delete('/:id', async (req, res) => {
  const rec = await Recurring.findByIdAndDelete(req.params.id);
  if(!rec) return res.status(404).json({ success:false, message:'Not found' });
  res.json({ success:true, message:'Recurring removed' });
});

module.exports = router;
