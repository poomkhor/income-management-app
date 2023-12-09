const express = require('express');
const router = express.Router();
// import income controller
const expenseCtrl = require('../controllers/expense.js');
// Require the auth middleware
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /income/new to add income and ensure loggedin
router.get('/expense/new', ensureLoggedIn, expenseCtrl.new);

// POST income
router.post('/expense', ensureLoggedIn, expenseCtrl.create);

// DELETE income
router.delete('/expense/:id', ensureLoggedIn, expenseCtrl.delete);

module.exports = router;
