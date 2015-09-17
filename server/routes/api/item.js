var express = require('express'),
    Item = require('../../models/item'),
    router = express.Router(),
    isAuth = require('../../middleware/auth'),
    parseImage = require('../../middleware/parseImage');

//Items API
router.put('/', isAuth(), parseImage('photoUrl', 'imageId'), function (req, res) {
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

router.post('/', isAuth(), parseImage('photoUrl', 'imageId'), function (req, res) {
    var findOptions = {
            _id: req.body._id,
            userId: req.user._id
        },
        newFields = req.body;

    //todo: need to update item
    Item.update(findOptions, newFields, function (error, numAffected) {
        if (error) {
            res.json({
                success: false,
                error: error
            });
        }
        res.json({
            success: true,
            item: newFields
        });
    });
});


router.get('/', function (req, res) {
    var query = req.query || {};
    Item.find(query, function (err, items) {
        res.json({
            success: true,
            items: items
        });
    });
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    Item.findById(id, function (err, item) {
        res.json({
            success: true,
            item: item
        });
    });
});
module.exports = router;