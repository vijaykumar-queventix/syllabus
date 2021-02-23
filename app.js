const express = require('express');
const { send } = require('process');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const userroutes = require('./routes/users')
const bodyParser = require('body-parser');
const path = require('path');
const users = require('./models/userschema');

// defining port
const port = process.env.PORT || 3000;

// connecting to db
const { dbConnection } = require('./database');
const { pathToFileURL } = require('url');
dbConnection();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/jsonggjuhy
app.use(bodyParser.json())

// Setup Static Path
app.use(express.static("public"));
//view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', userroutes);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});