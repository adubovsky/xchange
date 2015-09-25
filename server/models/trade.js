"use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Trade = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    offered: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    requested: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    tradeUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    offerDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['confirmed', 'rejected', 'pending'],
        default: 'pending'
    }
});


module.exports = mongoose.model('Trade', Trade);