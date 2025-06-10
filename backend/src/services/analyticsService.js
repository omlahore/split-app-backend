// backend/src/services/analyticsService.js
const Expense = require('../models/expense');

exports.monthlySummary = async (req, res, next) => {
  try {
    // optional `?month=YYYY-MM`
    const match = {};
    if (req.query.month) {
      const [year, mon] = req.query.month.split('-').map(Number);
      match.createdAt = {
        $gte: new Date(year, mon - 1, 1),
        $lt:  new Date(year, mon,     1)
      };
    }

    const summary = await Expense.aggregate([
      { $match: match },
      { 
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month:{ $month:'$createdAt' },
            category: '$category'
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: { year:'$_id.year', month:'$_id.month' },
          monthTotal: { $sum: '$total' },
          byCategory: {
            $push: {
              category: '$_id.category',
              total: '$total',
              count: '$count'
            }
          }
        }
      },
      {
        $project: {
          _id:      0,
          year:     '$_id.year',
          month:    '$_id.month',
          total:    '$monthTotal',
          categories: '$byCategory'
        }
      },
      { $sort: { year:1, month:1 } }
    ]);

    res.json({ success:true, data: summary });
  } catch(err) { next(err); }
};

exports.spendingPatterns = async (req, res, next) => {
  try {
    const agg = await Expense.aggregate([
      // total per person
      { 
        $group: {
          _id: '$paid_by',
          spent: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: null,
          groupTotal: { $sum: '$spent' },
          members: {
            $push: {
              person: '$_id',
              spent: '$spent',
              count: '$count'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          groupTotal: 1,
          memberCount: { $size: '$members' },
          groupAverage: { $divide: ['$groupTotal', { $size: '$members' }] },
          members: 1
        }
      }
    ]);

    res.json({ success:true, data: agg[0] || { groupTotal:0, memberCount:0, groupAverage:0, members:[] } });
  } catch(err) { next(err); }
};

exports.topExpenses = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const top    = await Expense.find()
      .sort({ amount:-1 })
      .limit(limit)
      .select('amount description paid_by category createdAt');
    res.json({ success:true, data: top });
  } catch(err) { next(err); }
};

exports.topCategories = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const cats  = await Expense.aggregate([
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $sort: { total: -1 } },
      { $limit: limit },
      { $project: { _id:0, category:'$_id', total:1 } }
    ]);
    res.json({ success:true, data: cats });
  } catch(err) { next(err); }
};
