var express = require('express'),
    Brand = require('../../models/brand'),
    router = express.Router(),
    isAuth = require('../../middleware/auth');

//Items API
router.put('/', isAuth(), function (req, res) {
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

    });
});

module.exports = router;