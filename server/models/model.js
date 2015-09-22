var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Model = new Schema({
    name: String,
    description: String,
    brandId: Schema.Types.ObjectId
});

module.exports = mongoose.model('Model', Model);