const FinishedWithdraw = require('../model/FinishedWithdrawModel');
const mongoose = require('mongoose');

async function getAll() {
    return (await FinishedWithdraw.find({}).lean()).reverse();
}

async function insertOne(data) {
    var newFinishedWithdraw = FinishedWithdraw(data);
    await newFinishedWithdraw.save();
    return newFinishedWithdraw;
}

module.exports = {
    getAll,
    insertOne,
}