var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Category = new Schema({
    name: String,
    description: String,
    parent: Schema.Types.ObjectId
});

module.exports = mongoose.model('Category', Category);