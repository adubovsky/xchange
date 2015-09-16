var express = require('express'),
    router = express.Router(),
    multiparty = require('connect-multiparty'),
    path = require('path'),
    config = require('../config');

router.post('/item/photo', multiparty(), function (req, res) {
    var file = req.files.file;
    res.json({
        success: true,
        file: {
            temp: path.join('/images', path.relative(config.serverDir, file.path))
        }
    });
});

module.exports = router;