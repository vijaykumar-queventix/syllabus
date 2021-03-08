const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then((conn) => {
            console.log(`MongDB Connected : ${conn.connection.host}`);
        });
    } catch (error) {
        console.log('Error while connecting to db ' + error);
    }

}

module.exports = { dbConnection };