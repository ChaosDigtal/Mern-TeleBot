const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExpiredContractModel = new Schema({
    username: String,
    chat_id: Number,
    budget: Number,
    crypto: String,
    start_time: Date,
    end_time: Date,
}, {collection: "expired_contract"});

module.exports = mongoose.model('ExpiredContractModel', ExpiredContractModel);