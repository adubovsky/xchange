var express = require('express'),
    Model = require('../../models/model'),
    Brand = require('../../models/brand'),
    Category = require('../../models/category'),
    router = express.Router(),
    isAuth = require('../../middleware/auth'),
    deferred = require('deferred'),
    TagCollection = require('../../collections/tags');

router.get('/', function (req, res) {
    var query = req.query.searchQuery,
        findModels = deferred(),
        findBrands = deferred(),
        findCategories = deferred();

    Model.find({
        name: new RegExp(query, 'i')
    }, function (err, models) {
        findModels.resolve(models);
    });

    Brand.find({
        name: new RegExp(query, 'i')
    }, function (err, brands) {
        findBrands.resolve(brands);
    });

    Category.find({
        name: new RegExp(query, 'i')
    }, function (err, categories) {
        findCategories.resolve(categories);
    });

    Promise.all([findModels.promise, findBrands.promise, findCategories.promise]).then(function (values) {
        var tags = new TagCollection(),
        //[models, brands, categories] = values; Todo: waiting for destructing feature
            models = values[0],
            brands = values[1],
            categories = values[2];

        tags.add('model', models);
        tags.add('brand', brands);
        tags.add('category', categories);

        res.json({
            success: true,
            tags: tags.getAll()
        });
    });
});

module.exports = router;