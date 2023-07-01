const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FinishedWithdrawModel = new Schema({
    username: String,
    chat_id: Number,
    crypto: String,
    amount: Number,
    address: String,
    time: Date,
    state: String,
}, {collection: "Finished_withdraw"});

module.exports = mongoose.model('FinishedWithdrawModel', FinishedWithdrawModel);