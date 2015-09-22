var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Model = new Schema({
    name: String,
    description: String,
    categoryId: Schema.Types.ObjectId,
    subCategoryId: Schema.Types.ObjectId,
    brandId: Schema.Types.ObjectId
});

module.exports = mongoose.model('Model', Model);