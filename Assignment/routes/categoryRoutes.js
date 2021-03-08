const router = require('express').Router();
const categoryControllers = require('../controllers/categoryControllers');

router.post('/addcategory', categoryControllers.add_category_post);
router.post('/addcatalog', categoryControllers.add_catalog_post );

router.post('/list', categoryControllers.list);


module.exports = router