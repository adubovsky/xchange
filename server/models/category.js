'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//Schema for categories and subcategories from Ebay
var Category = new Schema({
    name: String,
    ebayId: String,
    parentEbayId: String,
    level: Number,
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