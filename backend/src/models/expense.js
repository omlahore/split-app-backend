// src/models/expense.js
const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount must be positive']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  paid_by: {
    type: String,
    required: [true, 'Paid_by (person) is required']
  },
  category: {
    type: String,
    enum: ['Food', 'Travel', 'Utilities', 'Entertainment', 'Other'],
    default: 'Other',
    required: [true, 'Category is required']
  },
  split: {
    type: {
      type: String,
      enum: ['equal', 'percentage', 'exact'],
      default: 'equal'
    },
    values: {
      type: Map,
      of: Number,
      default: {}
    }
  },
  settled: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Expose `id` (string) instead of `_id`
ExpenseSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Include virtuals when converting to JSON
ExpenseSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Expense', ExpenseSchema);
