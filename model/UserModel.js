const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserModel = new Schema({
    username: String,
    chat_id: Number,
    btc: Number,
    bnb: Number,
    trc: Number,
    bsc: Number,
    trx: Number,
    bcs: Number,
    ltc: Number,
}, {collection: "user"});

module.exports = mongoose.model('UserModel', UserModel);