const mongoose = require('mongoose');

let csvSchema = new mongoose.Schema({
    name : String,
    age : Number,
    subject : String,
    city : String

});

module.exports = mongoose.model('csvfiles', csvSchema);