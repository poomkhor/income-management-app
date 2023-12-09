// import expense model
const Expense = require('../models/expense');

module.exports = {
    new: newCategory,
    create,
};

function newCategory(req, res) {
    // render create new income page
    res.render('app/new-category.ejs', { title: 'Add New Category' });
}

async function create(req, res) {}
