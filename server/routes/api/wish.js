var express = require('express'),
    Wish = require('../../models/wish'),
    Tag = require('../../models/tag'),
    router = express.Router(),
    isAuth = require('../../middleware/auth');

router.put('/', isAuth(), function (req, res) {
    var tagId = req.body.tag._id,
        wish;

    Tag
        .findById(tagId)
        .exec()
        .then(function (tag) {
            wish = Wish.new(tag);
            wish.user = req.body.user;
            wish.save(function (error, wish) {
                if (error) {
                    res.json({
                        success: false,
                        error: error
                    });
                }
                res.json({
                    success: true,
                    wish: wish
                });
            });
        });
});

router.get('/', isAuth(),function (req, res) {
    var query = req.query || {};
    Wish
        .find(query)
        .populate('model brand subCategory category', 'name -_id')
        .select('-user -__v')
        .exec()
        .then(function (wishes) {
            res.json({
                success: true,
                wishes: wishes
            });
        },
        function (error) {
            res.json({
                success: false,
                error: error
            });
        });
});

module.exports = router;