const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PendingContractModel = new Schema({
    username: String,
    chat_id: Number,
    budget: Number,
    crypto: String,
    hash: String,
    time: Date,
}, {collection: "pending_contract"});

module.exports = mongoose.model('PendingContractModel', PendingContractModel);