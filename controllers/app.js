// import income and expense model
const Income = require('../models/income');
const { Expense } = require('../models/expense');
const User = require('../models/user');

module.exports = { index };

// displaying dashboard with income and expense
async function index(req, res) {
    // get income and expense and sort by date
    const userId = req.user._id;
    let income = await Income.find({}).sort('date');
    // get months variable for filter display
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
    let expense = await Expense.find({}).sort('date');
    // get months from expense to be used in filter option
    expense.forEach((e) => {
        if (
            !months.includes(
                e.date.toLocaleString('default', { month: 'short' })
            )
        ) {
            months.push(e.date.toLocaleString('default', { month: 'short' }));
        }
    });
    // implement filter value
    // get value from req query received from form filterMonth
    const month = req.query.filterMonth;
    // get month from string got this from https://stackoverflow.com/questions/13566552/easiest-way-to-convert-month-name-to-month-number-in-js-jan-01
    function getMonthFromString(month) {
        return new Date(Date.parse(month + ' 1, 2012')).getMonth() + 1;
    }
    // if month exist and month is not All
    if (month) {
        if (!(month === 'All')) {
            expense = await Expense.find({
                $expr: {
                    $eq: [{ $month: '$date' }, getMonthFromString(month)],
                },
            });
            income = await Income.find({
                $expr: {
                    $eq: [{ $month: '$date' }, getMonthFromString(month)],
                },
            });
        }
    }
    const user = await User.findById(userId);
    res.render('app/app.ejs', {
        title: 'Dashboard',
        income,
        expense,
        user,
        months,
        month,
    });
}
