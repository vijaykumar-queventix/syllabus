const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    status : Number,            //  0 when registered, 1 when login 
    phoneNumber : {
        type : Number,
        required : true,
    },
    firstName : String,
    lastName : String,
    access_token : String,
    otp : Number,
    created_on : Date,
    last_login : Date
});

module.exports = mongoose.model('users', userSchema);