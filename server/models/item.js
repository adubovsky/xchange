'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//Item schema
var Item = new Schema({
    title: String,
    description: String,
    price: {type: Number, min: 1, max: 1000000},
    imageId: Schema.Types.ObjectId,
    visible: Boolean,
    userId: Schema.Types.ObjectId,
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    category:{
        type: Schema.Types.ObjectId,
        ref: 'EbayCategory'
    },
    subCategory:[{
        type: Schema.Types.ObjectId,
        ref: 'EbayCategory'
    }],
    createDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Item', Item);