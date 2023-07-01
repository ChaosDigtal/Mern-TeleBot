const express = require("express");
const cookieParser = require("cookie-parser");
const Telebot = require('telebot');

const router = express.Router();
router.use(cookieParser());

const c23 = {
    "Bitcoin": "btc",
    "BNB BSC": "bnb",
    "Tether USDT (TRC20)": "trc",
    "BUSD BSC": "bsc",
    "TRON TRX": "trx",
    "Bitcoin Cash": "bcs",
    "Litecoin": "ltc",
}

const {
    getAll,
    deleteOne,
} = require('../controller/PendingWithdraw');

const {
    insertOne,
} = require('../controller/FinishedWithdraw');

const {
    insertOne : insertUser,
    updateOneByName,
    isExist,
} = require('../controller/User');
const { updateOne } = require("../model/PendingContractModel");

router.post('/getAll', async (req, res) => {
    var list = await getAll();
    res.json({
        result: "success",
        data: list
    });
});

router.post('/accept', async (req, res) => {
    var deleted = req.body.data;
    await updateOneByName(deleted.username, {
        crypto: c23[deleted.crypto],
        budget: deleted.amount * -1.0,
    })
    await deleteOne(deleted._id);
    var inserted = await insertOne({
        username: deleted.username,
        chat_id: deleted.chat_id,
        crypto: deleted.crypto,
        amount: deleted.amount,
        address: deleted.address,
        time: Date.now(),
        state: "Accepted",
    });
    bot = new Telebot('6045174097:AAHYV53yHblVs5_KXQGZNDq4JQE5ThB4vYI');
    bot.sendMessage(deleted.chat_id, `Your request withdrawing ${deleted.amount}$ to ${deleted.crypto} was accepted!\n\nCheck following hash to confirm!\n\n${req.body.hash}`);
    res.json({
        result: "success",
    });
});

router.post('/reject', async (req, res) => {
    var deleted = req.body.data;
    await deleteOne(deleted._id);
    var inserted = await insertOne({
        username: deleted.username,
        chat_id: deleted.chat_id,
        crypto: deleted.crypto,
        amount: deleted.amount,
        address: deleted.address,
        time: Date.now(),
        state: "Rejected",
    });
    bot = new Telebot('6045174097:AAHYV53yHblVs5_KXQGZNDq4JQE5ThB4vYI');
    bot.sendMessage(deleted.chat_id, `Your request withdrawing ${deleted.amount}$ via ${deleted.crypto} was rejected!\n\n`);
    res.json({
        result: "success",
    });
});


module.exports = router;