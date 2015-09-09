var express = require('express'),
    passport = require('passport'),
    Account = require('../models/account'),
    router = express.Router(),
    isAuth = require('../middleware/auth');

router.get('/', function (req, res) {
    res.sendFile('/index.html');
});

module.exports = router;