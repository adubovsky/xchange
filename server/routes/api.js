'use strict';
/**
 * API Router Config
 */
var express = require('express'),
    router = express.Router();
//API items array
[
    'item',
    'category',
    'brand',
    'model',
    'wish',
    'trade'
].forEach(function (routeName) {
        router.use('/'+routeName, require('./api/'+routeName));
    });


module.exports = router;