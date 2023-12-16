const express = require('express');
const router = express.Router();
// import expense controller
const expenseCtrl = require('../controllers/expense.js');
// import category controller
const categoryCtrl = require('../controllers/category.js');
// Require the auth middleware
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /income/new to add income and ensure loggedin
router.get('/expense/new', ensureLoggedIn, expenseCtrl.new);

// POST income
router.post('/expense', ensureLoggedIn, expenseCtrl.create);

// DELETE income
router.delete('/expense/:id', ensureLoggedIn, expenseCtrl.delete);

// GET /category/new to add category and ensure loggedin
router.get('/category/new', ensureLoggedIn, categoryCtrl.new);

// POST /category
router.post('/category', ensureLoggedIn, categoryCtrl.create);

// EDIT /expense
router.get('/expense/:id/edit', ensureLoggedIn, expenseCtrl.edit);

// UPDATE /expense
router.put('/expense/:id', ensureLoggedIn, expenseCtrl.update);

module.exports = router;
