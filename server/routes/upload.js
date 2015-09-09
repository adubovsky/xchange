var express = require('express'),
    router = express.Router(),
    multiparty = require('connect-multiparty'),
    path = require('path'),
    config = require('../config/site');

router.post('/item/photo', multiparty(), function (req, res) {
    var file = req.files.file;
    res.json({
        success: true,
        file: {
            temp: path.relative(config.serverDir, file.path)
        }
    });
});

module.exports = router;