const mongoose = require('mongoose');
const userModel = require('../models/UsersModel');
const jwt = require('jsonwebtoken');
const { findOneAndUpdate } = require('../models/UsersModel');

exports.login_signup_post = async (req, res) => {

    // checking if phoneNumber existense in db
    let userExistense = await userModel.findOne({ phoneNumber: req.body.phoneNumber });
    if (userExistense) {
        // generating random otp
        let randomOtp = Math.floor(1000 + Math.random() * 9000);

        // sending otp
        let updateUserOtp = await userExistense.updateOne({ otp: randomOtp }, { new: true });

        // sending response if success
        return res.status(200).json({
            'statusCode': 200,
            'message': 'otp sent'
        })
    }

    // if user is new
    let registerUser = new userModel({
        status: 0,
        phoneNumber: req.body.phoneNumber,
        firstName: "",
        lastName: "",
        access_token: "",
        otp: 1234,
        created_on: Date.now(),
        last_login: ""
    });

    try {
        let saveData = registerUser.save();

        // sending response if success
        return res.status(200).json({
            'statusCode': 200,
            'message': 'Phone no. register Succussfully and otp sent successfully',
            'data': registerUser
        })
    } catch (error) {
        // sending response if failed
        return res.status(200).json({
            'statusCode': 400,
            'message': 'error while registeration',
            'Error': error.stack
        })
    }
}

/**
 * verifying otp
 * 
 */
exports.verify_otp_post = async (req, res) => {

    // fetching userData with phoneNumber in db
    let userData = await userModel.findOne({ phoneNumber: req.body.phoneNumber })

    // checking valid opt
    if (userData.otp !== req.body.otp)
        return res.status(200).json({
            'statusCode': 401,
            'message': 'Invalid otp or opt not matched'
        });

    // generating token
    let token = jwt.sign({ phoneNumber: req.body.phoneNumber, id: userData._id }, process.env.JWT_SCRT_KEY);

    // updating access_token and last login details in db
    let updateData = await userData.updateOne({
        status: 1,
        access_token: token,
        last_login: Date.now()
    }, { new: true });

    // fetching updated data from db for response 
    let responseData = await userModel.findOne({ phoneNumber: req.body.phoneNumber });

    // sending response if success
    res.status(200).json({
        'statusCode': 200,
        'message': 'user logged in',
        'data': responseData
    });

}

// Update User Post Api
exports.update_post = async (req, res) => {

    // Fetching User From db And Updating firstName and lastName Fields in db
    let updateData = await userModel.findOneAndUpdate({ phoneNumber: req.body.phoneNumber }, {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }, { new: true });

    // if User Not Found Sending Response
    if (!updateData) return res.status(200).json({
        'statusCode': 404,
        'message': 'userData Not Found'
    })

    // if Success Sending Response
    return res.status(200).json({
        'statusCode': 200,
        'message': 'User Updated Successfully',
        'data': updateData
    });
}

// Delete User Post Api
exports.delete_post = async (req, res) => {

    // fetching user from db and deleting
    let deletedUser = await userModel.findOneAndDelete({
        phoneNumber: req.body.phoneNumber
    });

    // checking if user not found then Send Response
    if (!deletedUser) return res.status(200).json({
        'statusCode': 404,
        'message': 'User Not Found, Cannot delete user'
    });

    // if success then send response
    return res.status(200).json({
        'statusCode': 200,
        'message': 'User Deleted Successfully',
        'data': deletedUser
    })
}

exports.testingDate = async(req, res) => {

    let Date = await userModel.findOne({});
    console.log(Date.created_on);
    let time = Date.created_on.toLocaleTimeString()
    console.log(time);
    //console.log(Date);
    // let date = new Date()
    //  console.log(date);
    // res.status(200).send(date);
    // let time = date.slice(0,10);
    res.send(time);
}