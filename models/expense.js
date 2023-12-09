const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
    {
        date: { type: Date, required: true },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        detail: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            min: 0,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        note: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Expense', expenseSchema);
