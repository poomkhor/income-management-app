// import income model
const Income = require('../models/income');

module.exports = {
    new: newIncome,
    create,
};

function newIncome(req, res) {
    // render create new income page
    res.render('app/new-income.ejs', { title: 'Add Income' });
}

async function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userEmail = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // Remove empty properties so that defaults will be applied
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    try {
        // Update this line because now we need the _id of the new income
        const income = await Income.create(req.body);
        // Redirect to the new income's show functionality
        res.redirect('/app');
    } catch (err) {
        // Typically some sort of validation error
        console.log(err);
        res.render('app/new-income.ejs', {
            title: 'Add Income',
            errorMsg: err.message,
        });
    }
}
