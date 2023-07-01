const ExpiredContract = require('../model/ExpiredContractModel');
const mongoose = require('mongoose');

async function getAll() {
    return (await ExpiredContract.find({}).lean()).reverse();
}

async function insertOne(data) {
    var newExpiredContract = ExpiredContract(data);
    await newExpiredContract.save();
    return newExpiredContract;
}

module.exports = {
    getAll,
    insertOne,
}