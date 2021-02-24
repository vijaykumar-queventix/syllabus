const jwt = require('jsonwebtoken');
const userModel = require('../models/userschema');
const localStorage = require('localStorage')

async function authenticateToken (req, res, next) {
    // Gather the jwt access token from the request header
    //const authHeader = req.headers['authorization']
    //const token = authHeader && authHeader.split(' ')[1]
    //console.log("werujhgghj     ", token);
    let token = localStorage.getItem('loggedToken');
    let email = localStorage.getItem('loggedEmail');
    //console.log(token)
    if (token == null) return res.status(200).json({
        'statusCode' : 401,
        'message' : 'token not found'
    }) // if there isn't any token


    // // Fetching token from database
    // let validuser = await userModel.findOne({email: req.body.email});
    // let usertoken = await validuser.access_token;
    // //console.log("usertokeknnnnn " ,usertoken);

    // // comparing token from header to token from database
    // if(token!==usertoken)
    // return res.status(200).json({
    //           'statusCode' : 401,
    //           'message' : ' token not matched',
    //           'token' : usertoken
    // });

    // next();
    

    jwt.verify(token, process.env.JWT_SCRT_KEY,(err, decoded) => {
        console.log("decoded token ",decoded);
        //console.log(err)
      if(err) return res.status(200).json({
          'statusCode' : 401,
          'message' : 'Invalid token',
          'token' : token
      })

      if(email !== decoded.email)
      return res.status(200).json({
        'statusCode' : 401,
        'message' : 'token not matched',
        'token' : token
    });
      
      //console.log(req.email);
      //console.log(decoded.email);
      next() // pass the execution off to whatever request the client intended
    })
}

module.exports = authenticateToken;