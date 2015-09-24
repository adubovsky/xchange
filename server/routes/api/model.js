var express = require('express'),
    Model = require('../../models/model'),
    Brand = require('../../models/brand'),
    router = express.Router(),
    isAuth = require('../../middleware/auth'),
    Tag = require('../../models/tag');

router.put('/', isAuth('admin'), function (req, res) {
    var model = new Model(req.body);

    model.save(function (error, model) {
        if (error) {
            res.json({
                success: false,
                error: error
            });
        }
        if (model.brand) {
            Brand
                .findByIdAndUpdate(model.brand,
                {
                    $push: {
                        models: model._id
                    }
                },
                {safe: true, upsert: true},
                function (err, brand) {
                    model.brand = brand;
                    res.json({
                        success: true,
                        model: model
                    });
                    //Append new tag
                    Tag
                        .new('model', model)
                        .save();
                    console.log('%s brand is updated.', brand.name);
                });
        }
    });
});

router.get('/', function (req, res) {
    var query = req.query || {};
    Model.find(query, function (err, models) {
        res.json({
            success: true,
            models: models
        });
    });
});

module.exports = router;