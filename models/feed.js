var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
// Define schema
var Feed = mongoose.schema({
    globalURL: {type: ObjectId, ref: 'FeedURL'},
    read: {type: Boolean, required: true}
})

module.exports = mongoose.model('Feed', FeedURL);