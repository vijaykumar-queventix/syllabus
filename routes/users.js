const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontrollers');
//const { userValidationRules, validate } = require('../validations/userregister');
const JwtAuth = require('../validations/jwtAuthentication');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const uploadModel = require('../models/uploadSchema');

router.get('/', usercontroller.register_get);
//router.get('/login', usercontroller.login_get)


// Multer setup
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

 var upload = multer({ storage: storage })



// register post api
router.post('/', usercontroller.register_post);

// login post api
router.post('/login', usercontroller.login_post);


//dashboard get api
router.get('/dashboard', JwtAuth, usercontroller.dashboard_get);


// update put api
router.put('/update/:id', JwtAuth, usercontroller.update_put);

// delete api
router.delete('/delete/:id', JwtAuth, usercontroller.delete)

// upload image api using multer
 router.post('/upload', upload.single('file'), usercontroller.upload_post)

// csv post api
router.post('/csv', usercontroller.csv_post);

// csv get api
router.get('/csv', usercontroller.csv_get);


/**
 * create pdf using html-pdf module
 * @ post route
 */

router.post('/createpdf', usercontroller.Create_pdf_post);


module.exports = router