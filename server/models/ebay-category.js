'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//Schema for categories and subcategories from Ebay
var EbayCategory = new Schema({
    name: String,
    ebayId: String,
    parentEbayId: String,
    level: Number,
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'EbayCategory'
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'EbayCategory',
        select: '-parent'
    }]
});

module.exports = mongoose.model('EbayCategory', EbayCategory);