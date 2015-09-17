var express = require('express'),
    Category = require('../../models/category'),
    router = express.Router(),
    isAuth = require('../../middleware/auth'),
    parseImage = require('../../middleware/parseImage');

//Categories API
router.get('/', function (req, res) {
    Category.find({parent: null})
        .populate('children')
        .exec(function (err, categories) {
            res.json({
                success: true,
                categories: categories
            });
        });
});

router.put('/', isAuth('admin'), function (req, res) {
    if (!req.body.parent) {
        req.body.parent = null;
    }
    var category = new Category(req.body);

    category.save(function (err, category) {
        if (err) {
            res.json({
                success: false,
                error: err
            });
        }

        if (category.parent) {
            Category
                .findByIdAndUpdate(category.parent,
                {
                    $push: {
                        children: category._id
                    }
                },
                {safe: true, upsert: true},
                function (err, parent) {
                    console.log('%s category is updated.', parent.name);
                });
        }

        res.json({
            success: true,
            category: category
        });

    });
});
module.exports = router;