'use strict';
var express = require('express'),
    Wish = require('../../models/wish'),
    router = express.Router(),
    isAuth = require('../../middleware/auth'),
    Category = require('../../models/category'),
    _ = require('underscore');

router.put('/', isAuth(), function (req, res) {
    var wish;
});

router.get('/', isAuth(), function (req, res) {
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

router.get('/search/', function (req, res) {
    var query = req.query || {},
        searchPromises = [];

    searchPromises.push(
        Category
            .find({
                name: {
                    $regex: query.searchQuery,
                    $options: 'i'
                }
            })
            .exec()
            .then(function (categories) {
                categories.type = 'Category';
                return categories;
            })
    );

    Promise.all(searchPromises)
        .then(function (searchResponses) {
            var tags = _.flatten(searchResponses).slice(0,5);
            console.log( searchResponses[0].type );
            return tags;
        })
        .then(function (tags) {
            res.json({
                success: true,
                tags: tags
            });
        })
        .catch(function (error) {
            res.json({
                success: false,
                error: error
            });
        });

});


module.exports = router;