var express = require('express'),
//models
    Item = require('../models/item'),
    Category = require('../models/category'),

    router = express.Router(),
    isAuth = require('../middleware/auth'),
    parseImage = require('../middleware/parseImage'),
    Image = require('../models/image');
//Items API
router.put('/item', isAuth(), parseImage('photoUrl', 'imageId'), function (req, res) {
    var item = new Item(req.body);

    item.save(function (error, item) {
        if (error) {
            res.json({
                success: false,
                error: error
            });
        }
        res.json({
            success: true,
            item: item
        });

    });
});

router.post('/item', isAuth(), parseImage('photoUrl', 'imageId'), function (req, res) {
    var item = new Item(req.body),
        userId = req.user._id;
    res.json({success:true});
    //todo: need to update item
    /*item.save(function (error, item) {
        if (error) {
            res.json({
                success: false,
                error: error
            });
        }
        res.json({
            success: true,
            item: item
        });

    });*/
});


router.get('/items', function (req, res) {
    Item.find({}, function (err, items) {
        res.json({
            success: true,
            items: items
        });
    });
});

router.get('/item/:id', function (req, res) {
    var id = req.params.id;
    Item.findById(id, function (err, item) {
        res.json({
            success: true,
            item: item
        });
    });
});
//End of Items API
//Categories API
router.get('/categories', function (req, res) {
    Category.find({parent: null})
        .populate('children')
        .exec(function (err, categories) {
            res.json({
                success: true,
                categories: categories
            });
        });
});

router.put('/category', isAuth('admin'), function (req, res) {
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