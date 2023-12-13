// import expense model
// const Expense = require('../models/expense');
const { Category } = require('../models/expense');

module.exports = {
    new: newCategory,
    create,
};

function newCategory(req, res) {
    // render create new income page
    res.render('app/new-category.ejs', { title: 'Add New Category' });
}

async function create(req, res) {
    // post new category to be rendered in /app/new-expense.ejs
    const user = req.user._id;
    const userName = req.user.name;
    const userEmail = req.user.email;
    const userAvatar = req.user.avatar;
    const category = req.body.category;
    try {
        const categoryNew = new Category({
            category,
            user,
        });
        await categoryNew.save();

        const categories = await Category.find({});
        res.render('app/new-expense.ejs', {
            title: 'Add Expense',
            categories,
        });
    } catch (err) {
        // Typically some sort of validation error
        console.log(err);
        res.render('app/new-category.ejs', {
            title: 'Add New Category',
            errorMsg: err.message,
        });
    }
}
