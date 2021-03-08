
const { check, validationResult } = require('express-validator')

exports.userValidationRules = () => {
    return [
        check('phoneNumber', 'Phone no. must be of 10 digit').isLength({ min: 10, max: 10 })
    ]
}

// validations for update page
exports.updateValidations = () =>{
    return [
        check('firstName', 'special characters not allowerd in firstName').isAlpha(),
        check('lastName', 'special characters not allowerd in lastName').isAlpha()
    ]
}

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    //console.log(validationResult(req));
    //console.log(typeof(errors));

    if (!errors.isEmpty()) {
        return res.status(200).json({
            'statusCode': 400,
            'message': 'validation Failed !!',
            errors: errors.array()
        });
    }
    next();
}

// module.exports = {
//     userValidationRules,
//     updateValidations,
//     validate,
// }