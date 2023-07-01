const User = require('../model/UserModel');
const mongoose = require('mongoose');

async function getAll() {
    return (await User.find({}).lean()).reverse();
}

async function isExist(name) {
    return (await User.exists({username: name}) !== null);
}

async function insertOne(name, chat_id) {
    var newUser = User({
        username: name,
        chat_id: chat_id,
        btc: 0,
        bnb: 0,
        trc: 0,
        bsc: 0,
        trx: 0,
        bcs: 0,
        ltc: 0,
    });
    await newUser.save();
    return newUser;
}

async function updateOneByName(name, data) {
    var user = await User.findOne({username: name});
    var crypto = data.crypto;
    var budget = user[crypto] + data.budget;

    console.log(user, crypto, user[crypto], typeof user[crypto]);
    console.log(typeof data.budget);
    console.log(typeof budget);
    return await User.findOneAndUpdate({ username: name }, {$set: {[crypto]: parseFloat(budget)}});
}

module.exports = {
    getAll,
    isExist,
    insertOne,
    updateOneByName,
}