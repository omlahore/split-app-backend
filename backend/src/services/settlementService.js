// src/services/settlementService.js

const Expense = require('../models/expense');

async function calculateBalances() {
  const expenses = await Expense.find();
  const people = new Set();

  // 1) Add every payer
  expenses.forEach(e => {
    people.add(e.paid_by);
  });

  // 2) For non-equal splits, add those participants too
  expenses.forEach(e => {
    if (e.split.type !== 'equal' && e.split.values) {
      // Mongoose Map vs plain object?
      if (e.split.values instanceof Map) {
        for (const name of e.split.values.keys()) {
          people.add(name);
        }
      } else {
        Object.keys(e.split.values).forEach(name => people.add(name));
      }
    }
  });

  // 3) Initialize net balances
  const net = {};
  for (const name of people) {
    net[name] = 0;
  }

  // 4) Compute who paid vs their share
  expenses.forEach(e => {
    const total = e.amount;
    if (e.split.type === 'equal') {
      // Everyone shares equally
      const share = total / people.size;
      for (const name of people) {
        net[name] -= share;
      }
      net[e.paid_by] += total;

    } else if (e.split.type === 'percentage') {
      // percentage map: { "Alice": 50, "Bob": 50 }
      const entries = e.split.values instanceof Map
        ? Array.from(e.split.values.entries())
        : Object.entries(e.split.values);

      for (const [name, percent] of entries) {
        net[name] -= (percent / 100) * total;
      }
      net[e.paid_by] += total;

    } else if (e.split.type === 'exact') {
      // exact map: { "Alice": 30, "Bob": 70 }
      const entries = e.split.values instanceof Map
        ? Array.from(e.split.values.entries())
        : Object.entries(e.split.values);

      for (const [name, amt] of entries) {
        net[name] -= amt;
      }
      net[e.paid_by] += total;
    }
  });

  return { people: [...people], net };
}

function simplifyTransactions(net) {
  const creditors = [];
  const debtors   = [];

  for (const [name, bal] of Object.entries(net)) {
    if (bal > 0) creditors.push({ name, amt: bal });
    else if (bal < 0) debtors.push({ name, amt: -bal });
  }

  const txns = [];
  let i = 0, j = 0;

  while (i < debtors.length && j < creditors.length) {
    const d = debtors[i];
    const c = creditors[j];
    const amount = Math.min(d.amt, c.amt);

    txns.push({
      from: d.name,
      to:   c.name,
      amount
    });

    d.amt -= amount;
    c.amt -= amount;
    if (d.amt === 0) i++;
    if (c.amt === 0) j++;
  }

  return txns;
}

module.exports = { calculateBalances, simplifyTransactions };
