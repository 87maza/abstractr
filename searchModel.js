var mongoose = require('mongoose');

var SearchSchema = mongoose.Schema({
    term : String,
    when : Date
});

module.exports = mongoose.model('Searches', SearchSchema);