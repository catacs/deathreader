var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define schema
var GlobalURLSchema = new Schema({
    url : { type: String, required: true } ,
    displayName:  { type: String, required: true}
    insertDate:   {type: Date, required: true}
});


module.exports = mongoose.model('GlobalURL', GlobalURLSchema);