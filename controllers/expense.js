// import expense model
const Expense = require('../models/expense');
const mongoose = require('mongoose');

module.exports = {
    new: newExpense,
    create,
    delete: deleteIncome,
};

function newExpense(req, res) {
    // render create new income page
    res.render('app/new-expense.ejs', { title: 'Add Expense' });
}

async function create(req, res) {
    // add user to the body to create expense document

    const user = req.user._id;
    const userName = req.user.name;
    const userEmail = req.user.name;
    const userAvatar = req.user.avatar;

    // Remove empty properties so that defaults will be applied
    for (let key in req.body) {
        console.log(req.body);
        if (req.body[key] === '') delete req.body[key];
    }
    try {
        console.log(req.body);
        // create new expense document
        const date = req.body.date;
        const detail = req.body.detail;
        const amount = req.body.amount;
        const category = req.body.category;
        const expense = new Expense({
            date: date,
            detail: detail,
            amount: amount,
            category: {
                category: category,
                user,
            },
            user,
            userName,
            userEmail,
            userAvatar,
        });

        await Expense.create(expense);
        // Redirect to the new income's show functionality
        res.redirect('/app');
    } catch (err) {
        // Typically some sort of validation error
        console.log(err);
        res.render('app/new-expense.ejs', {
            title: 'Add Income',
            errorMsg: err.message,
        });
    }
}

async function deleteIncome(req, res) {
    const expenseId = req.params.id;
    await Expense.deleteOne({ _id: expenseId });
    res.redirect('/app');
}
