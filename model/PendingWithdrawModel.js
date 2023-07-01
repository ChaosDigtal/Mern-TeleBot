const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PendingWithdrawModel = new Schema({
    username: String,
    chat_id: Number,
    crypto: String,
    amount: Number,
    address: String,
    time: Date,
}, {collection: "pending_withdraw"});

module.exports = mongoose.model('PendingWithdrawModel', PendingWithdrawModel);