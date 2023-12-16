// import expense model
const { Expense, Category } = require('../models/expense');
const mongoose = require('mongoose');

module.exports = {
    new: newExpense,
    create,
    delete: deleteExpense,
    edit: editExpense,
    update: updateExpense,
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
        // create new expense document
        const date = req.body.date;
        const detail = req.body.detail;
        const amount = req.body.amount;
        const category = req.body.category;
        const note = req.body.note;
        const expense = new Expense({
            date: date,
            detail: detail,
            amount: amount,
            category: {
                category,
                user,
            },
            user,
            note,
        });
        await expense.save();
        // Redirect to the new income's show functionality
        res.redirect('/app');
    } catch (err) {
        // Typically some sort of validation error
        console.log(err);
        res.render('app/new-expense.ejs', {
            title: 'Add Expense',
            errorMsg: err.message,
        });
    }
}

async function deleteExpense(req, res) {
    const expenseId = req.params.id;
    await Expense.deleteOne({ _id: expenseId });
    res.redirect('/app');
}

async function editExpense(req, res) {
    const expenseId = req.params.id;
    const expense = await Expense.findOne({ _id: expenseId });
    // get a date format to prefil ejs
    const date =
        expense.date.getFullYear().toString() +
        '-' +
        (expense.date.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        expense.date.getDate().toString().padStart(2, '0');

    const categories = await Category.find({});
    res.render('app/edit-expense.ejs', {
        title: 'Edit Expense',
        categories,
        expense,
        date,
    });
}

async function updateExpense(req, res) {
    const expenseId = req.params.id;
    try {
        // pull up expense value for model
        const date = req.body.date;
        const detail = req.body.detail;
        const amount = req.body.amount;
        const category = req.body.category;
        const note = req.body.note;
        const user = req.user;

        const update = {
            date: date,
            detail: detail,
            amount: amount,
            category: {
                category,
                user,
            },
            user,
            note,
        };

        let expense = await Expense.findByIdAndUpdate(
            { _id: expenseId },
            update
        );
        res.redirect('/app');
    } catch (err) {
        // Typically some sort of validation error
        console.log(err);
        res.render('app/edit-expense.ejs', {
            title: 'Edit Expense',
            errorMsg: err.message,
        });
    }
}
