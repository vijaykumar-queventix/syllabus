const { categoryModel } = require('../models/ProductsModel')
const catalogModel = require('../models/catelog');
const mongoose = require('mongoose');

exports.add_category_post = async (req, res) => {

    let addedCategory = new categoryModel({
        categoryName: "jalklk",
        categoryImage: "jlakjfl",
        status: 1
    });

    try {
        let SaveCategory = await addedCategory.save();
        return res.status(200).json({
            'statusCode': 200,
            'message': 'Category Added Successfully',
            'data': addedCategory
        })
    } catch (error) {
        return res.status(200).json({
            'statusCode': 404,
            'message': 'Cannot Add Category',
            'data': error
        })
    }
}

exports.add_catalog_post = (req, res) => {

    // added catalog in db
    let addCatalog = new catalogModel({
        catalogName: req.body.catalogName,
        category: {
            categoryId: new mongoose.Types.ObjectId(),
            categoryName: req.body.categoryName,
            categoryImage: req.body.categoryImage,
            status: 1,
            created_on: Date.now(),
            subcategory: {
                subcategoryId: new mongoose.Types.ObjectId(),
                subcategoryName: req.body.subcategoryName,
                status: 1,
                products: {
                    productId: new mongoose.Types.ObjectId(),
                    productName: req.body.productName,
                    selling_price: req.body.selling_price,
                    unit: req.body.unit,
                    quantity: req.body.quantity,
                    product_details: req.body.product_details,
                    MRP: req.body.MRP,
                    product_image: req.body.product_image,
                    status: 1,
                    created_on: Date.now()
                }
            }
        }

    });

    let saveCatalog = addCatalog.save();

    return res.status(200).json({
        'statusCode': 200,
        'message': 'added catalog',
        'data': addCatalog
    });
}

exports.list = async (req, res) => {
    let list = await categoryModel.find({});
    let byid = await categoryModel.findOne({ catalog : '746573742064656661756c74' });

    res.status(200).send(byid)
}