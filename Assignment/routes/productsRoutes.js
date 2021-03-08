const router = require('express').Router();
const productsControllers = require('../controllers/productsControllers');
const {addedProductValidation, message} = require('../validations/productsValidations')
const multer = require('multer');

// multer storage setup
const storage = multer.diskStorage({
    destination (req, file, cb) {
        cb(null, 'uploads');
    },
    filename (req, file, cb) {
        cb(null, file.originalname + Date.now());
    }
});

const upload = multer({storage});

//product routes
router.post('/addproduct',upload.single('product_image') , addedProductValidation(), message, productsControllers.add_product_post);
router.post('/updateproduct', upload.single('product_image'), addedProductValidation(), message, productsControllers.update_product_post);
router.post('/listproducts', productsControllers.list_product_post)
router.post('/deleteproduct', addedProductValidation(), message, productsControllers.delete_product_post);

module.exports = router;