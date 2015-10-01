'use strict';
var fs = require('fs'),
    config = require('../config'),
    Image = require('../models/image'),
    path = require('path');

function exportParseImage(imageFieldName, setToField) {
    //todo: should work if imageFieldName is an array of strings
    function parseImageId(req, res, next) {
        var imagePath = req.body[imageFieldName],
            fullImagePath,
            image;
        //if we have a parsed image and it is not updated we go through
        if (imagePath) {
            //imagePath should be /images/:id
            //if :id starts with temp/ than we should store temporary image to DB
            //and set to setToField in req.body id of new doc in DB

            var id = imagePath.slice(8);
            if (id.slice(0, 4) === 'temp') {
                //it need to be stored
                fullImagePath = path.join('./', config.serverDir, id);
                image = new Image({
                    data: fs.readFileSync(fullImagePath),
                    //todo: need to know exact contentType
                    contentType: 'image/' + (path.extname(imagePath).slice(1))
                });
                image.save(function (error, image) {
                    if (error) {
                        console.log('Image saving error');
                        res.status(500);
                        res.end('');
                    }
                    req.body[setToField] = image._id;
                    fs.unlink(fullImagePath);
                    next();
                });
            } else {
                //is has been stored already and nothing changed
                next()
            }
        } else {
            res.status(400);
            console.log('imagePath is not found in request');
            res.end('');
        }
    }

    return parseImageId;
}

module.exports = exportParseImage;