// backend/src/routes/analytics.js
const express = require('express');
const router  = express.Router();
const analytics = require('../services/analyticsService');

router.get('/monthly-summary',    analytics.monthlySummary);
router.get('/spending-patterns',  analytics.spendingPatterns);
router.get('/top-expenses',       analytics.topExpenses);
router.get('/top-categories',     analytics.topCategories);

module.exports = router;
