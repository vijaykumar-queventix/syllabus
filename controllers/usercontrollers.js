const usermodel = require('../models/userschema');
//const uploadModel = require('../model/uploadSchema');
//const passport = require('passport');
//const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const localStorage = require('localStorage')

const bcrypt = require('bcrypt');
const { findByIdAndUpdate } = require('../models/userschema');

//const multer = require('multer');

const path = require('path');

exports.register_get = (req, res) => {
    //req.flash('message', 'Success!!');      // sending a flash message while redirecting
    //res.redirect('/login');
}

exports.login_get = (req, res) => {
    res.render('login');

}

exports.dashboard_get = (req, res) => {
    let local = localStorage;
    let email = localStorage.getItem('loggedEmail')
    let pass = localStorage.getItem('loggedPassword');

    res.status(200).json({
        'statusCode': 200,
        'localstorage' : local, 
        'email' : email,
        'password' : pass,
        'message': 'this is dashboard page'
    })
}

/**
 * post register api
 * 
 */
exports.register_post = async (req, res) => {

    // checking if user existense
    let validuser = await usermodel.findOne({ email: req.body.email });
    if (validuser) return res.status(200).send({
        'status': 400,
        'message': 'user already exists',
        'date': validuser
    });


    // password hassing
    let hasspassword = await bcrypt.hash(req.body.password, 10);

    // geting data from body
    let registerUser = new usermodel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone_number: req.body.phone_number,
        email: req.body.email,
        password: hasspassword,
        access_token: "",
        status: 0,
        created_date: Date.now(),
        last_login: ""
    });

    try {


        // saving data in db and sending response
        let saveData = registerUser.save();
        res.status(200).send({
            'status': 200,
            'message': 'user registered successfully',
            'date': registerUser
        })
    } catch (error) {
        console.log(error);
    }
}



/**
 * post register api
 * 
 */
exports.login_post = async (req, res) => {

    let loginEmail = req.body.email;
    let loginPassword = req.body.password;

    // checking user existence
    let validuser = await usermodel.findOne({ email: loginEmail });
    if (!validuser)
        return res.status(200).send({
            'status': 404,
            'message': 'user not find '
        });

    // comparing password
    let validpass = await bcrypt.compare(loginPassword, validuser.password);
    if (!validpass)
        return res.status(200).send({
            'status': 404,
            'message': 'Password not matched '
        });

    // Generating token for access_token update
    let token = jwt.sign({ email: validuser.email }, process.env.JWT_SCRT_KEY)

    // updating access_token, last_login and status
    let updatedUser = await validuser.updateOne({
        status: 1,
        access_token: token,
        last_login: Date.now()
    }, { new: true })

    // finding User data to send in response
    let responseData = await usermodel.findOne({ email: loginEmail });
    localStorage.setItem('loggedEmail', validuser.email);
    localStorage.setItem('loggedPassword', loginPassword);

    res.redirect('/dashboard');


    // return res.status(200).send({
    //     'status': 200,
    //     'message': 'user logged in ',
    //     'data': responseData
    // });
}


exports.update_put = async (req, res) => {
    let userId = await req.params.id;

    try {
        let updatedData = await usermodel.findOneAndUpdate({ $and: [{ _id: userId }, { email: req.body.email }] }, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone_number: req.body.phone_number
        }, { new: true });

        res.status(200).json({
            'statusCode': 200,
            'mesaage': 'user updated successfully',
            'data': updatedData
        });
    } catch (error) {
        console.log(error)
        res.status(200).json({
            'statusCode': 401,
            'mesaage': 'Erorr While Updating',
            'Error': error
        })
    }
}



exports.delete = async (req, res) => {
    let userId = await req.params.id;
    console.log(userId)

    try {
        let deletedUser = await usermodel.findOneAndDelete({
            $and:
                [
                    { _id: userId },
                    { email: req.body.email }
                ]
        });
        if (deletedUser == null)
            return res.status(200).json({
                'statusCode': 401,
                'mesaage': 'Cannot Find User, Email and Id not matched',
                'User': deletedUser
            });


        res.status(200).json({
            'statusCode': 200,
            'mesaage': 'User Deleted Successfully',
            'Deleted User': deletedUser
        })
    } catch (error) {
        res.status(200).json({
            'statusCode': 401,
            'mesaage': 'Erorr While Deleting',
            'Error': error
        })
    }
}


//upload post api

exports.upload_post = async (req, res, next) => {
    //console.log(req.file);
    let filepath = req.file.path;
    if (!req.file) {
        return res.status(200).json({
            'statusCode': 401,
            'mesaage': 'File Not Found'
        });
        
    }

    let image = new uploadModel({
        imagename: filepath
    })

    let response = await image.save();
    res.status(200).json({
        'statuCode': 200,
        'message': 'Image uploaded successfully'
    })

    //res.json({ fileUrl: 'http://192.168.0.7:3000/images/' + req.file.filename });
    //res.send('succuess')
}