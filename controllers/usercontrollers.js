const usermodel = require('../models/userschema');
const uploadModel = require('../models/uploadSchema');
//const passport = require('passport');
//const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const localStorage = require('localStorage');
const session = require('express-session');
const fs = require('fs');
const csv = require('fast-csv');
const csvModel = require('../models/forCSV');
const pdf = require('html-pdf');
const bcrypt = require('bcrypt');
const { findByIdAndUpdate } = require('../models/userschema');

//const multer = require('multer');

const path = require('path');



exports.register_get = (req, res) => {
    //req.flash('message', 'Success!!');      // sending a flash message while redirecting
    //res.redirect('/login');
    res.send('working');
}

exports.login_get = (req, res) => {
    res.render('login');

}

exports.dashboard_get = (req, res) => {
    let local = localStorage;
    let email = localStorage.getItem('email');
    let loggedEmail = localStorage.getItem('loggedEmail');
    let token = localStorage.getItem('loggedToken');
    let loggedEmail2 = req.session.loggedEmail;
    console.log(loggedEmail2);

    res.status(200).json({
        'statusCode': 200,
        'allDate': local,
        'email': email,
        'loggedEmail': loggedEmail,
        'loggedEmail2': loggedEmail2,
        'token': token,
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
    ////localStorage.setItem('loggedEmail', validuser.email);
    //console.log(token);
    // localStorage.setItem('loggedToken', token);
    // localStorage.setItem('email', "gurpreet@gmail.com");
    // req.session.loggedEmail = "testingsession";
    //res.redirect('/dashboard');


    return res.status(200).send({
        'status': 200,
        'message': 'user logged in ',
        'data': responseData
    });
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


exports.csv_post = async (req, res) => {

    csv
        .parseFile('/media/vijay/7846B0D246B091FC/syllabus/' + 'employee.csv', { headers: true })
        .on("data", async function (data) {
            console.log(data);
            //Removes spaces from property value in-case it does have
            for (var key in data) {
                //console.log('##########',data['name']);
                data[key] = data[key].trim();
            }

            //Create a employee Object and assign all values for it to save in database
            var insertedData = new csvModel({
                name: data['name'],
                age: data['age'],
                subject: data['subject'],
                city: data['city']
            });

            try {
                //save in database
                let savedData = await insertedData.save();
                return res.status(200).json({
                    'statusCode': 200,
                    'message': 'Data inserted successfully in db',
                    'data': insertedData
                })
            } catch (error) {
                return res.status(200).json({
                    'statusCode': 400,
                    'message': 'Error While Saving Data Into Db',
                    'Error': error
                })
            }
        })
}



exports.csv_get = async (req, res) => {

    var data = await csvModel.find({});
    var data1 = JSON.parse(JSON.stringify(data));
    //console.log(data);
    //console.log("------------------------------------------------------------------");
    ///console.log(data1);

    try {
        let writerStream = fs.createWriteStream('output.csv');
        csv
            .write(data1, { headers: true }, (chunk) => {
                console.log(chunk);
            })
            .on('finish', () => {
                //res.send("<a href='/media/vijay/7846B0D246B091FC/syllabus/output.csv' download='output.csv' id='download-link'></a><script>document.getElementById('download-link').click();</script>");
                console.log('Write finished');

            })
            .pipe(writerStream);

        return res.status(200).json({
            'statusCode': 200,
            'message': '.CSV File Created Successfully'
        })


    } catch (error) {
        res.status(200).json({
            'statusCode': 401,
            'message': 'File not Created',
            'Error': error
        })
    }
}

// converting html file to pdf
exports.Create_pdf_post = (req, res) => {

    try {
        let content = fs.readFileSync('/media/vijay/7846B0D246B091FC/syllabus/ForPdfGenerate.html', 'utf-8');
        pdf.create(content).toStream((err, stream) => {
            let writerStream = fs.createWriteStream('generated.pdf');
            stream.pipe(writerStream);
            
            return res.status(200).json({
                'statusCode': 200,
                'message': 'Pdf File Created Successfully',
            })
        })
    } catch (error) {
        return res.status(200).json({
            'statusCode': 505,
            'message': 'Cannot create file',
            'data': error.stack
        })
    }
}