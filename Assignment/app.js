const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000 ;
const bodyParser = require('body-parser');


 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(express.json());

// dbconnection
const {dbConnection} = require('./config/database');
dbConnection();

// importing routes
const userRoutes = require('./routes/usersRoute');
const productRoutes = require('./routes/productsRoutes');
const category = require('./routes/categoryRoutes');

// routes setup
app.use('/', userRoutes);
app.use('/products', productRoutes);
app.use('/category', category);


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});