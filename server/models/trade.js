"use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//Schema for trades (exchanges of items)
var Trade = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
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
        ref: 'Account'
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
/**
 * Virtual fields confirm/reject for trade confirmation/rejection
 */
Trade.virtual('confirm').set(function (value) {
    if(value){
        this.status = 'confirmed';
    }
});
Trade.virtual('reject').set(function (value) {
    if(value){
        this.status = 'rejected';
    }
});

module.exports = mongoose.model('Trade', Trade);