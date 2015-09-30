'use strict';
var express = require('express'),
    Brand = require('../../models/brand'),
    router = express.Router(),
    isAuth = require('../../middleware/auth'),
    Tag = require('../../models/tag');

router.put('/', isAuth('admin'), function (req, res) {
    var brand = new Brand(req.body);

    brand.save(function (error, brand) {
        if (error) {
            res.json({
                success: false,
                error: error
            });
        }
        res.json({
            success: true,
            brand: brand
        });
        //Append new tag
        Tag
            .new('brand', brand)
            .save();
    });
});

router.get('/', function (req, res) {
    var query = req.query || {};
    Brand.find(query, function (err, brands) {
        res.json({
            success: true,
            brands: brands
        });
    });
});

module.exports = router;