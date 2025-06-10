const cron = require('node-cron');
const Recurring = require('../models/recurringExpense');
const Expense   = require('../models/expense');

function addInterval(date, frequency) {
  const d = new Date(date);
  if(frequency === 'daily')   d.setDate(d.getDate()+1);
  if(frequency === 'weekly')  d.setDate(d.getDate()+7);
  if(frequency === 'monthly') d.setMonth(d.getMonth()+1);
  return d;
}

// Run every day at 00:05
cron.schedule('5 0 * * *', async () => {
  const now = new Date();
  const due = await Recurring.find({ nextDate: { $lte: now } });
  for(const r of due) {
    // Create real expense
    const exp = {
      amount:    r.amount,
      description:r.description,
      paid_by:   r.paid_by,
      category:  r.category,
      split:     r.split
    };
    await Expense.create(exp);
    // Schedule next occurrence
    r.nextDate = addInterval(r.nextDate, r.frequency);
    await r.save();
  }
});
