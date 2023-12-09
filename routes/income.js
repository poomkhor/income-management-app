const express = require('express');
const router = express.Router();
// import income controller
const incomeCtrl = require('../controllers/income.js');
// Require the auth middleware
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /income/new to add income and ensure loggedin
router.get('/income/new', ensureLoggedIn, incomeCtrl.new);

// POST income
router.post('/income', ensureLoggedIn, incomeCtrl.create)

module.exports = router;