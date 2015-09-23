var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Brand = new Schema({
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
    models: [{
        type: Schema.Types.ObjectId,
        ref: 'Model'
    }]
});

module.exports = mongoose.model('Brand', Brand);