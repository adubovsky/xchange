var express = require('express'),
    Trade = require('../../models/trade'),
    router = express.Router(),
    isAuth = require('../../middleware/auth');
/**
 * new trade api
 *   offered {Array} array of items which current user offers
 *   requested {Array} array of items which current user needs
 *   tradeUser {userId} id of user whose items have been requested
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

router.get('/', function (req, res) {
    var query = req.query || {};

    Trade
        .find(query)
        .populate('offered requested')
        .exec(function (err, trades) {
        res.json({
            success: true,
            trades: trades
        });
    });
});
module.exports = router;