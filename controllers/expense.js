// import income model
const Expense = require('../models/expense');

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
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userEmail = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // Remove empty properties so that defaults will be applied
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    try {
        // create new expense document
        await Expense.create(req.body);
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
