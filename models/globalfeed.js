var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DaySchema = new Schema({
    
})
// Define schema
var GlobalFeedSchema = new Schema({
    title : { type: String, required: true } ,
    link:  { type: String, required: true},
    description:   {type: String, required: true},
    language: {type:String, required: false},
    copyright: {type:String, required: false},
    managingEditor: {type:String, required: false},
    webMaster: {type:String, required: false},{type:String, required: false},
    pubDate: {type: Date, required: false},
    lastBuildDate: {type: Date, required: false},
    category: {type: String, required: false},
    generator: {type: String, required: false},
    docs: {type: String, required: false},
    cloud: {type: String, required: false},
    ttl: {type: Number},
    image: {type: String, required: false},
    rating: {type: String, required: false},
    textInput: {type: String, required: false},
    skipHours: {type: Number, min: 0, max: 23},
    skipDays: {type: array}
});


module.exports = mongoose.model('GlobalFeed', GlobalFeedSchema);