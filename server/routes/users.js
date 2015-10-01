'use strict';
var express = require('express'),
    passport = require('passport'),
    Account = require('../models/account'),
    router = express.Router(),
    isAuth = require('../middleware/auth'),
    parseImage = require('../middleware/parseImage'),
    Image = require('../models/image'),
    _ = require('underscore');

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

router.post('/settings', isAuth(), parseImage('photoUrl', 'imageId'), function (req, res) {
    var currentUser = req.user,
        userSettings = req.body,
        id = currentUser,
        savingPromise;

    savingPromise = new Promise(function (resolve, reject) {
        if (id.equals(userSettings._id)) {
            if (userSettings.imageId) {
                req.user.imageId = userSettings.imageId;
            }
            req.user.name = userSettings.name;

            req.user.save(function (err, user) {
                if (!_.isEmpty(err)) {
                    reject(err);
                } else {
                    resolve(user)
                }
            });
        } else {
            reject({errorText: 'You are not authorised to do that!'});
        }
    });

    savingPromise
        .then(function (user) {
            res.json({
                success: true,
                user: user
            });
        })
        .catch(function (error) {
            //if something happened during saving we should delete image from db
            Image
                .find({id: userSettings.imageId})
                .remove()
                .exec();

            res
                .json({
                    success: false,
                    error: error
                });
        });
});


module.exports = router;