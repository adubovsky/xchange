var express = require('express'),
    Model = require('../../models/model'),
    Brand = require('../../models/brand'),
    Category = require('../../models/category'),
    router = express.Router(),
    isAuth = require('../../middleware/auth'),
    deferred = require('deferred'),
    Tag = require('../../models/tag');

router.get('/', function (req, res) {
    var query = req.query.searchQuery;

    Tag
        .find({
            name: {
                $regex: query,
                $options: 'i'
            }
        })
        .populate('category subCategory brand', 'name -_id')
        .exec(function (err, tags) {
            res.json({
                success: true,
                tags: tags
            });
        });

});

router.get('/updateTags', isAuth('admin'), function (req, res) {
    var defModels = deferred(),
        defBrands = deferred(),
        defCategories = deferred();
    Tag
        .find({})
        .remove()
        .exec();

    Model
        .find({})
        .populate('brand category subCategory')
        .exec(function (err, models) {
            var tags = [];
            models.forEach(function (model) {
                var tag = Tag.new('Model', model);
                tags.push(tag);
                tag.save();
            });
            defModels.resolve(true);
        });

    Brand
        .find({})
        .populate('category subCategory')
        .exec(function (err, brands) {
            var tags = [];
            brands.forEach(function (model) {
                var tag = Tag.new('Brand', model);
                tags.push(tag);
                tag.save();
            });
            defBrands.resolve(true);
        });
    Category
        .find({})
        .populate('parent')
        .exec(function (err, categories) {
            var tags = [];
            categories.forEach(function (model) {
                var tag = Tag.new('Category', model);
                tags.push(tag);
                tag.save();
            });
            defCategories.resolve(true);
        });
    Promise.all([defModels.promise, defBrands.promise, defCategories.promise]).then(function (values) {
        res.json({
            success: true,
            saved: {
                models: values[0],
                brands: values[1],
                categories: values[2]
            }
        });
    });
});

module.exports = router;