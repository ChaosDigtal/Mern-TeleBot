const PendingContract = require('../model/PendingContractModel');
const mongoose = require('mongoose');

async function getAll() {
    return (await PendingContract.find({}).lean()).reverse();
}

async function deleteOne(_id) {
    const deleted = await PendingContract.findOneAndDelete({_id: _id});
    //console.log(deleted);
    return deleted;
}

module.exports = {
    getAll,
    deleteOne,
}