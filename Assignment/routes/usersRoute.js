const router = require('express').Router();
const userControllers = require('../controllers/usersControllers');
const {userValidationRules,updateValidations, validate} = require('../validations/schemaValidations');
const jwtAuth = require('../validations/jwtAuthentication');

// users routes
router.post('/', userValidationRules(), validate, userControllers.login_signup_post);
router.post('/verifyotp', userControllers.verify_otp_post);
router.post('/update', updateValidations(), validate, jwtAuth, userControllers.update_post);
router.post('/delete', userControllers.delete_post);
router.post('/testingdate', userControllers.testingDate);

module.exports = router;