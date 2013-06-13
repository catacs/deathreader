var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
// Define schema
var FeedURL = mongoose.schema({
    user: {type: ObjectId, ref: 'User'}
    globalURL: {type: ObjectId, ref: 'GlobalURL'}
})

module.exports = mongoose.model('FeedURL', FeedURL);