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

router.post('/', isAuth(), function (req, res) {
    var query = req.body || {};
    var tradeId = query._id;
    var userId = req.user.id;
    console.log(tradeId, userId);
    Trade
        .findById(tradeId)
        .exec(function (err, trade) {
            if (query.confirm || query.reject) {
                //only trade user can confirm or reject trade
                if (!trade.tradeUser.equals(userId)) {
                    res.json({
                        success: false,
                        error: {
                            errorText: 'You are not authorized to confirm or reject this trade'
                        }
                    });
                }
                else {
                    //confirm or reject
                    trade
                        .set({
                            confirm: query.confirm,
                            reject: query.reject
                        })
                        .save(function (err, trade) {
                            res.json({
                                success: true,
                                trade: trade
                            });
                        });
                }
            }
            else {
                trade
                    .update(query)
                    .exec(function (err, trade) {
                        res.json({
                            success: true,
                            trade: trade
                        });
                    });
            }
        });
});
module.exports = router;