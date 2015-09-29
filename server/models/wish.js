"use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//Schema for wishes (Wishes have been used for trades suggesting system)
var Wish = new Schema({
        type: {
            type: String,
            enum: ['model', 'brand', 'subCategory', 'category'].reverse()
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
    },
    {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });
/**
 * Genereates instance of new wish by tag
 * @param tag {Tag}
 * @returns wish {Wish} instance of wish
 */
Wish.statics.new = function (tag) {
    var wish = new this(),
        types = wish.schema.path('type').enumValues;
    wish.type = tag.type;
    types.forEach(function (type) {
        if (type === wish.type) {
            wish[type] = tag.rel;
        } else {
            //mongoose has method model();
            if (typeof tag.parents[type] !== 'function') {
                wish[type] = tag.parents[type];
            }
        }
    });
    return wish;
};

Wish.virtual('level').get(function () {
    var types = this.schema.path('type').enumValues,
        wish = this,
        maxLevel = 0;

    types.forEach(function (type, index) {
        if ( typeof wish[type] !== 'undefined'){
            maxLevel = index;
        }
    });
    return {
        current: types.indexOf(wish.type),
        max: maxLevel
    }
});

module.exports = mongoose.model('Wish', Wish);