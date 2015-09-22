var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Model = new Schema({
    name: String,
    description: String,
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    subCategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    brandId: {
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    }
});

module.exports = mongoose.model('Model', Model);