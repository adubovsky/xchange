"use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Wish = new Schema({
    type: {
        type: String,
        enum: ['model', 'brand', 'subCategory', 'category']
    },
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
    },
    model: {
        type: Schema.Types.ObjectId,
        ref: 'Model'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

Wish.statics.new = function (tag) {
    var wish = new this(),
        types = wish.schema.path('type').enumValues;
    wish.type = tag.type;
    types.reverse().forEach(function (type) {
        if (type === wish.type) {
            wish[type] = tag.rel;
        } else {
            //mongoose has method model();
            if ( typeof tag.parents[type] !== 'function' ) {
                wish[type] = tag.parents[type];
            }
        }
    });
    return wish;
};

module.exports = mongoose.model('Wish', Wish);