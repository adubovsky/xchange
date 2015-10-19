'use strict';
var express = require('express'),
    Wish = require('../../models/wish'),
    router = express.Router(),
    isAuth = require('../../middleware/auth');

router.put('/', isAuth(), function (req, res) {
    var wish;
});

router.get('/', isAuth(),function (req, res) {
    var query = req.query || {};
    Wish
        .find(query)
        .populate('model brand subCategory category', 'name -_id')
        .select('-user -__v')
        .exec()
        .then(function (wishes) {
            res.json({
                success: true,
                wishes: wishes
            });
        },
        function (error) {
            res.json({
                success: false,
                error: error
            });
        });
});

module.exports = router;