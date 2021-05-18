const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transferSchema = new Schema({
    sender: Object,
    receiver: Object,
    amount: Number,
    date: Date,
    reason: String,
});

const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = Transfer;