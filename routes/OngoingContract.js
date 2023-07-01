const express = require("express");
const cookieParser = require("cookie-parser");
const Telebot = require('telebot');

const router = express.Router();
router.use(cookieParser());

const {
    getAll,
    deleteOne,
} = require('../controller/OngoingContract');

const {
    insertOne,
} = require('../controller/ExpiredContract');

router.post('/getAll', async (req, res) => {
    var list = await getAll();
    res.json({
        result: "success",
        data: list
    });
});

router.post('/finish', async (req, res) => {
    var finished = req.body.data;
    await deleteOne(finished._id);
    insertOne({
        username: finished.username,
        chat_id: finished.chat_id,
        budget: finished.budget,
        crypto: finished.crypto,
        start_time: finished.time,
        end_time: Date.now(),
        left: 15,
    });
    bot = new Telebot('6045174097:AAHYV53yHblVs5_KXQGZNDq4JQE5ThB4vYI');
    bot.sendMessage(finished.chat_id, `Your contract depositing ${finished.budget}$ via ${finished.crypto} was expired!\n\nThank you`);
    res.json({
        result: "success",
    });
});


module.exports = router;