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
} = require('../controller/PendingContract');

const {
    insertOne,
    deleteOne : deleteOneFromOngoing,
    getById,
    updateOneById,
} = require('../controller/OngoingContract');

const  {
    insertOne : insertOneIntoExpired,
} = require('../controller/ExpiredContract');

const {
    insertOne : insertUser,
    updateOneByName,
    isExist,
} = require('../controller/User');

async function withdraw(_id) {
    var contract = await getById(_id);
    await updateOneById(_id, {left: contract.left - 1});
    await updateOneByName(contract.username, {
        crypto: c23[contract.crypto],
        budget: contract.budget * 0.15,
    })
    if (contract.left - 1 > 0) {
        setTimeout(withdraw, 2000, _id);
    } else {
        var deleted = await deleteOneFromOngoing(_id);
        await insertOneIntoExpired({
            username: deleted.username,
            chat_id: deleted.chat_id,
            budget: deleted.budget,
            crypto: deleted.crypto,
            start_time: deleted.time,
            end_time: Date.now(),
        });
        bot = new Telebot('6045174097:AAHYV53yHblVs5_KXQGZNDq4JQE5ThB4vYI');
        bot.sendMessage(deleted.chat_id, `Your contract depositing ${deleted.budget}$ via ${deleted.crypto} was successfully expired!\n\nThank you`);
    }
}

router.post('/getAll', async (req, res) => {
    var list = await getAll();
    res.json({
        result: "success",
        data: list
    });
});

router.post('/accept', async (req, res) => {
    var deleted = req.body.data;
    if (await isExist(deleted.username) === false)
        await insertUser(deleted.username, deleted.chat_id);
    await deleteOne(deleted._id);
    var inserted = await insertOne({
        username: deleted.username,
        chat_id: deleted.chat_id,
        budget: deleted.budget,
        crypto: deleted.crypto,
        time: Date.now(),
        left: 15,
    });
    bot = new Telebot('6045174097:AAHYV53yHblVs5_KXQGZNDq4JQE5ThB4vYI');
    bot.sendMessage(deleted.chat_id, `Your contract depositing ${deleted.budget}$ via ${deleted.crypto} was approved!\n\nYou can withdraw 15% every 24 hours for 15 days!`);
    setTimeout(withdraw, 2000, inserted._id);
    res.json({
        result: "success",
    });
});

router.post('/reject', async (req, res) => {
    var deleted = req.body.data;
    await deleteOne(deleted._id);
    bot = new Telebot('6045174097:AAHYV53yHblVs5_KXQGZNDq4JQE5ThB4vYI');
    bot.sendMessage(deleted.chat_id, `Your contract depositing ${deleted.budget}$ via ${deleted.crypto} was rejected!\n\n`);
    res.json({
        result: "success",
    });
});


module.exports = router;