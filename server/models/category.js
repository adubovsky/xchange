var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//Schema of item's categories and subcategories
var Category = new Schema({
    name: String,
    description: String,
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        select: '-parent'
    }]
});

module.exports = mongoose.model('Category', Category);