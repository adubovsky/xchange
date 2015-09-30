'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');
//User model
var Account = new Schema({
    username: String,
    password: String,
    name: String,
    role: String,
    registerDate: {
        type: Date,
        default: Date.now
    }
});

Account.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.salt;
    delete obj.hash;
    delete obj.__v;
    return obj;
};

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);