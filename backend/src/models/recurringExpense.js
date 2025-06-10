const mongoose = require('mongoose');

const RecurringExpenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  paid_by: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Food','Travel','Utilities','Entertainment','Other'],
    default: 'Other'
  },
  split: {
    type: {
      type: String,
      enum: ['equal','percentage','exact'],
      default: 'equal'
    },
    values: {
      type: Map,
      of: Number,
      default: {}
    }
  },
  frequency: {
    type: String,
    enum: ['daily','weekly','monthly'],
    required: true
  },
  nextDate: {
    type: Date,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('RecurringExpense', RecurringExpenseSchema);
