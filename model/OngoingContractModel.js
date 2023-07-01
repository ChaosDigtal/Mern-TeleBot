const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OngoingContractModel = new Schema({
    username: String,
    chat_id: Number,
    budget: Number,
    crypto: String,
    time: Date,
    left: Number,
}, {collection: "ongoing_contract"});

module.exports = mongoose.model('OngoingContractModel', OngoingContractModel);