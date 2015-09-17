var express = require('express'),
    router = express.Router(),
    itemRoutes = require('./api/item'),
    categoryRoutes = require('./api/category');

router.use('/item', itemRoutes);
router.use('/category', categoryRoutes);

module.exports = router;