var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//Schema for storing images in DB
var Image = new Schema({
    data: Buffer,
    contentType: String
});

module.exports = mongoose.model('Image', Image);