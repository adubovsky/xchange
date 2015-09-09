var express = require('express'),
    //models
    Item = require('../models/item'),
    Category = require('../models/category'),

    router = express.Router(),
    isAuth = require('../middleware/auth'),
    parseImage = require('../middleware/parseImage'),
    Image = require('../models/image');
//Items API
router.put('/item', isAuth, parseImage('imageId'), function (req, res) {
    var item = new Item(req.body);

    item.save(function (error, item) {
        if (error) {
            res.json({
                success: false,
                error: error
            });
        }
        //saving photo from item.tempImage to DB

        res.json({
            success: true,
            item: item
        });

    });
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
       })
    });
});
//End of Items API
//Categories API
router.get('/categories', function (req, res) {
    Category.find({}, function (err, categories) {
        res.json({
            success: true,
            categories: categories
        })
    });
});

module.exports = router;