// import expense model
const { Expense, Category } = require('../models/expense');
const mongoose = require('mongoose');

module.exports = {
    new: newExpense,
    create,
    delete: deleteExpense,
};

async function newExpense(req, res) {
    // render create new income page
    // need categories to render
    const categories = await Category.find({});
    res.render('app/new-expense.ejs', { title: 'Add Expense', categories });
}

async function create(req, res) {
    // add user to the body to create expense document

    const user = req.user._id;
    const userName = req.user.name;
    const userEmail = req.user.email;
    const userAvatar = req.user.avatar;

    try {
        // console.log('before :' + req.body);
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
                category,
                user,
            },
            user,
        });
        await expense.save();
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

async function deleteExpense(req, res) {
    const expenseId = req.params.id;
    await Expense.deleteOne({ _id: expenseId });
    res.redirect('/app');
}
