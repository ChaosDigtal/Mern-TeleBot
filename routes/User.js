const express = require("express");
const cookieParser = require("cookie-parser");
const Telebot = require('telebot');

const router = express.Router();
router.use(cookieParser());

const {
    getAll,
} = require('../controller/User');

router.post('/getAll', async (req, res) => {
    var list = await getAll();
    res.json({
        result: "success",
        data: list
    });
});

module.exports = router;