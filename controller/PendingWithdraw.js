const PendingWithdraw = require('../model/PendingWithdrawModel');
const mongoose = require('mongoose');

async function getAll() {
    return (await PendingWithdraw.find({}).lean()).reverse();
}

async function deleteOne(_id) {
    const deleted = await PendingWithdraw.findOneAndDelete({_id: _id});
    //console.log(deleted);
    return deleted;
}

module.exports = {
    getAll,
    deleteOne,
}