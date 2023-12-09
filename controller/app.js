// import income and expense model
const Income = require('../models/income');
const Expense = require('../models/expense');

module.exports = { index };

// displaying dashboard with income and expense
async function index(req, res) {
    const income = await Income.find({});
    const expense = await Expense.find({});
    res.render('app/index.ejs', { title: 'Dashboard', income, expense });
}
