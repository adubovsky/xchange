var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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
    }]
});

module.exports = mongoose.model('Item', Item);