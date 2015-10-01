'use strict';
var express = require('express'),
    passport = require('passport'),
    Account = require('../models/account'),
    router = express.Router(),
    isAuth = require('../middleware/auth'),
    parseImage = require('../middleware/parseImage');

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

router.post('/settings',  parseImage('photoUrl', 'imageId'), function (req, res) {
    var currentUser = req.user,
        userSettings = req.body;
    if (currentUser._id === userSettings._id) {
        res.json({
            success: true,
            user: userSettings
        });
    }
});


module.exports = router;