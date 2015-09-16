var express = require('express'),
    router = express.Router(),
    Image = require('../models/image'),
    config = require('../config'),
    path = require('path');

router.get('/:id', function (req, res) {
    var imageId = req.params.id;

    Image.findById(imageId, function (error, image) {
        if (error) {
            res.status(404);
            console.log(error);
            res.end();
        }
        res.contentType(image.contentType);
        res.send(image.data);
    });

});
router.get('/temp/:id', function (req, res) {
    var imageId = req.params.id,
        filePath = path.join(config.temporaryImages, imageId);
    res.sendFile(filePath, {
        root: '/'
    });
});

module.exports = router;