var express = require('express'),
    router = express.Router(),
    Image = require('../models/image');

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

module.exports = router;