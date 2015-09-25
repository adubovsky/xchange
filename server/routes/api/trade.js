var express = require('express'),
    Trade = require('../../models/trade'),
    router = express.Router(),
    isAuth = require('../../middleware/auth');
/**
 * new trade api
 *   offered {Array} array of items which current user offers
 *   required {Array} array of items which current user needs
 *   tradeUser {userId} id of user who has been offered
 */
router.put('/', isAuth(), function (req, res) {
    var trade = new Trade(req.body);
    trade
        .save(function (error, trade) {
            res.json({
                success: true,
                trade: trade
            });
        })
});

module.exports = router;