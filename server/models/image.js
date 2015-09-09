var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Image = new Schema({
    data: Buffer,
    contentType: String
});

module.exports = mongoose.model('Image', Image);