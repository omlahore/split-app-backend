// src/routes/settlements.js
const router = require('express').Router();
const { calculateBalances, simplifyTransactions } = require('../services/settlementService');

// Get list of people
router.get('/people', async (req, res) => {
  const { people } = await calculateBalances();
  res.json({ success: true, people });
});

// Get raw balances
router.get('/balances', async (req, res) => {
  const { people, net } = await calculateBalances();
  res.json({ success: true, people, balances: net });
});

// Get simplified settlement transactions
router.get('/', async (req, res) => {
  const { net } = await calculateBalances();
  const transactions = simplifyTransactions(net);
  res.json({ success: true, transactions });
});

module.exports = router;
