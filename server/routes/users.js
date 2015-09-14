var express = require('express'),
    passport = require('passport'),
    Account = require('../models/account'),
    router = express.Router(),
    isAuth = require('../middleware/auth');

router.post('/register', function (req, res) {
    var newAccount = new Account({username: req.body.username});
    Account.register(newAccount, req.body.password, function (err, account) {
        if (err) {
            return res.json({
                success: false,
                error: err
            });
        }
        res.json({
            success: true,
            user: account
        });
    });
});

router.post('/login', passport.authenticate('local'), function (req, res) {
    var user = req.user;
    res.json({
        success: true,
        user: user
    });
});

router.post('/logout', function (req, res) {
    req.logout();
    res.json({
        success: true
    });
});

router.get('/details', isAuth(), function (req, res) {
    var user = req.user;
    res.json({
        success: true,
        user: user
    });
});


module.exports = router;