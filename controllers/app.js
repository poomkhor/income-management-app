// import income and expense model
const Income = require('../models/income');
const Expense = require('../models/expense');
const User = require('../models/user');

module.exports = { index };

// displaying dashboard with income and expense
async function index(req, res) {
    // get income and expense and sort by date

    const userId = req.user._id;
    const income = await Income.find({}).sort('date');
    // get months variable for filter
    const months = [];
    // get months from income
    income.forEach((i) => {
        if (
            !months.includes(
                i.date.toLocaleString('default', { month: 'short' })
            )
        ) {
            months.push(i.date.toLocaleString('default', { month: 'short' }));
        }
    });
    const expense = await Expense.find({}).sort('date');
    // get months from expense
    expense.forEach((e) => {
        if (
            !months.includes(
                e.date.toLocaleString('default', { month: 'short' })
            )
        ) {
            months.push(e.date.toLocaleString('default', { month: 'short' }));
        }
    });
    const user = await User.findById(userId);
    res.render('app/app.ejs', {
        title: 'Dashboard',
        income,
        expense,
        user,
        months,
    });
}
