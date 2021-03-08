const { check, validationResult } = require('express-validator');

exports.addedProductValidation = () =>{
    return [
        check('productName', 'Only alphabets are allowed in productName').isAlpha().optional(),
        check('category', 'Only alphabets are allowed in category').isString().optional(),
        check('selling_price', 'Only number Value Allowed in selling_price').isNumeric().optional(),
        check('unit', 'Only Numbers Are Allowed In unit').isNumeric().optional(),
        check('product_image', 'Only alphabets are allowed in product_image ').isString().optional(),
        check('description', 'Only alphanumeric values are allowed in description').isString().optional()
    ]
}

exports.message = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({
            'statusCode': 400,
            'message': 'validation Failed !!',
            errors: errors.array()
        });
    }
    next();
}