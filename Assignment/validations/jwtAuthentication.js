const jwt = require("jsonwebtoken");
const UsersModel = require("../models/UsersModel");

async function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    // checking token if present
    if (token == null) return res.status(200).json({
        'statusCode': 404,
        'message': 'access_token not found'
    });

    let dbToken = await UsersModel.findOne({ access_token: token });
    if(!dbToken) return res.status(200).json({
        'statusCode':401,
        'message' : 'UnAuthorized'
    });
   

    // decoding the token
    let decoded = jwt.verify(token, process.env.JWT_SCRT_KEY);

    // checking token is valid or not
    if (decoded.phoneNumber !== req.body.phoneNumber)
        return res.status(200).json({
            'statusCode': 401,
            'message': 'Invalid token'
        })

    // pass the execution off to whatever request the client intended
    next();
}

module.exports = authenticateToken;