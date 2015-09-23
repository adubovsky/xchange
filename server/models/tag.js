"use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Tag = new Schema({
    name: String,
    rel: Schema.Types.ObjectId,
    type: {
        type: String,
        enum: ['Model', 'Brand', 'Category']
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
    }
});

Tag.statics.new = function (type, instance) {
    var tag = new this();

    tag.name = type === 'Model' ? [instance.brand.name, instance.name].join(' ') : instance.name;
    tag.type = type;
    tag.rel = instance._id;

    if (type === 'Category') {
        tag.category = instance.parent ? instance.parent._id : null;
    } else {
        tag.category = instance.category._id;
    }

    if (instance.subCategory) {
        tag.subCategory = instance.subCategory._id;
    }

    if (instance.brand) {
        tag.brand = instance.brand._id;
    }
    return tag;
};

module.exports = mongoose.model('Tag', Tag);