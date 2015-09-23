var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Model = new Schema({
    name: String,
    description: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    }
});

module.exports = mongoose.model('Model', Model);