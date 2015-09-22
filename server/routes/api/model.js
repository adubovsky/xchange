var express = require('express'),
    Model = require('../../models/model'),
    Brand = require('../../models/brand'),
    router = express.Router(),
    isAuth = require('../../middleware/auth');

router.put('/', isAuth('admin'), function (req, res) {
    var model = new Model(req.body);

    model.save(function (error, model) {
        if (error) {
            res.json({
                success: false,
                error: error
            });
        }
        if (model.brandId) {
            Brand
                .findByIdAndUpdate(model.brandId,
                {
                    $push: {
                        models: model._id
                    }
                },
                {safe: true, upsert: true},
                function (err, brand) {
                    console.log('%s brand is updated.', brand.name);
                });
        }
        res.json({
            success: true,
            model: model
        });

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