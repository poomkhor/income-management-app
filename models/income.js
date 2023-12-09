const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema(
    {
        date: { type: Date, required: true },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        source: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        note: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Income', incomeSchema);
