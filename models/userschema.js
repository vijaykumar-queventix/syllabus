
const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phone_number: Number,
    access_token: String,
    email: String,
    password: String,
    status : Number,
    created_date: Date,
    last_login : Date
});

module.exports = mongoose.model('users', userschema);