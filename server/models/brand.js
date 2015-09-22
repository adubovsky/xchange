var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Brand = new Schema({
    name: String,
    description: String,
    categoryId: Schema.Types.ObjectId,
    subCategoryId: Schema.Types.ObjectId
});

module.exports = mongoose.model('Brand', Brand);