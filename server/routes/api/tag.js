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
        .populate('parents.category parents.subCategory parents.brand', 'name -_id')
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

    //todo: need to check existing tags and add new if necessary
    res.json({});
    //Model
    //    .find({})
    //    .populate('brand', 'name _id')
    //    .exec(function (err, models) {
    //        var tags = [];
    //        models.forEach(function (model) {
    //            var tag = Tag.new('model', model);
    //            tags.push(tag);
    //            tag.save();
    //        });
    //        defModels.resolve(true);
    //    });
    //
    //Brand
    //    .find({})
    //    .exec(function (err, brands) {
    //        var tags = [];
    //        brands.forEach(function (brand) {
    //            var tag = Tag.new('brand', brand);
    //            tags.push(tag);
    //            tag.save();
    //        });
    //        defBrands.resolve(true);
    //    });
    //Category
    //    .find({})
    //    .exec(function (err, categories) {
    //        var tags = [];
    //        categories.forEach(function (category) {
    //            var tag = Tag.new(category.parent ? 'subCategory' : 'category', category);
    //            tags.push(tag);
    //            tag.save();
    //        });
    //        defCategories.resolve(true);
    //    });
    //Promise.all([defModels.promise, defBrands.promise, defCategories.promise]).then(function (values) {
    //    res.json({
    //        success: true,
    //        saved: {
    //            models: values[0],
    //            brands: values[1],
    //            categories: values[2]
    //        }
    //    });
    //});
});

module.exports = router;