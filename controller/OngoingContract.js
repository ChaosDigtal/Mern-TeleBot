const OngoingContract = require('../model/OngoingContractModel');
const mongoose = require('mongoose');

async function getAll() {
    return (await OngoingContract.find({}).lean()).reverse();
}

async function getById(_id) {
    return await OngoingContract.findById(_id);
}

async function deleteOne(_id) {
    return await OngoingContract.findOneAndDelete({_id: _id});
}

async function insertOne(data) {
    var newOngoingContract = OngoingContract(data);
    await newOngoingContract.save();
    return newOngoingContract;
}

async function updateOneById(_id, data) {
    return await OngoingContract.findByIdAndUpdate(_id, data);
}

module.exports = {
    getAll,
    insertOne,
    deleteOne,
    getById,
    updateOneById,
}