const mongoose = require('mongoose');
const {productModel} = require('../models/ProductsModel');
const multer = require('multer');

/**
 * '@/addproduct'
 *  addproduct post api
 */
exports.add_product_post = async (req, res) => {
    let filepath = req.file.path;
    if (!req.file) {
        return res.status(200).json({
            'statusCode': 401,
            'mesaage': 'File Not Found'
        });
    }

    let addedProduct = new productModel({
        ///categoryId: new mongoose.Types.ObjectId(),
        productName: req.body.productName,
        category: req.body.category,
        selling_price: req.body.selling_price,
        unit: req.body.unit,
        product_image: filepath,
        description: req.body.description,
        status: 1,
        created_on: Date.now()
    });
    console.log(addedProduct);

    try {
        let saveProduct = await addedProduct.save();
        return res.status(200).json({
            'statusCode': 200,
            'message': 'Product Added Successfully',
            'date': addedProduct
        })
    } catch (error) {
        return res.status(200).json({
            'statusCode': 400,
            'message': 'Problem while Saving Product In db',
            'data': error.stack
        })
    }

}

/**
 * '@/updateproduct'
 *  update products post api
 */

exports.update_product_post = async (req, res) => {

    let filepath = req.file.path;
    if (!req.file) {
        return res.status(200).json({
            'statusCode': 401,
            'mesaage': 'File Not Found'
        });
    }

    // fetching product details from db
    let productDetails = await productModel.findById({ _id: req.body._id });

    let productName = req.body.productName;
    if (productName == "") {
        productName = productDetails.productName;
    }

    let category = req.body.category;
    if (category == "") {
        category = productDetails.category;
    }

    let selling_price = req.body.selling_price;
    if (selling_price == "") {
        selling_price = productDetails.selling_price;
    }

    let unit = req.body.unit;
    if (unit == "") {
        unit = productDetails.unit;
    }

    let product_image = req.body.product_image;
    if (product_image == "") {
        product_image = productDetails.product_image;
    }

    let description = req.body.description;
    if (description == "") {
        description = productDetails.description;
    }

    // updating product details in DB
    let updateProduct = await productModel.findByIdAndUpdate({ _id: req.body._id }, {
        productName: productName,
        category: category,
        selling_price: selling_price,
        unit: unit,
        product_image: filepath,
        description: description,
        updated_on: Date.now()
    }, { new: true });

    try {
        // if success sending response
        if (updateProduct) return res.status(200).json({
            'statusCode': 200,
            'message': 'Product Updated Successfully',
            'date': updateProduct
        });
    } catch (error) {
        // if error sending error
        return res.status(200).json({
            'statusCode': 400,
            'message': 'Cannot find product',
            'data': error.stack
        });

    }
}



/**
 * '@/listproducts'
 *  list all products post api
 */

exports.list_product_post = async (req, res) => {
    // fetching all product from db
    let allProducts = await productModel.find();

    try {
        if (allProducts) return res.status(200).json({
            'statusCode': 200,
            'message': 'Listing of product is successfull',
            'data': allProducts
        });
    } catch (error) {
        return res.status(200).json({
            'statusCode': 404,
            'message': 'Products Not Found',
            'data': error
        });
    }
}


/**
 * '@/deleteproduct'
 *  delete products post api
 */
exports.delete_product_post = async (req, res) => {

    let id = req.body._id
    console.log(id);

    // if id is null sending response
    if (!id) return res.status(200).json({
        'statusCode': 404,
        'message': 'id not found',
        'data': id
    });

    // fetching product from Db and deleting
    let deletedProduct = await productModel.findByIdAndDelete({ _id: id });

    // if failed sending response
    if (!deletedProduct) return res.status(200).json({
        'statusCode': 404,
        'message': 'Product Not found For Deletion',
        'data': deletedProduct
    });

    // if success sending response
    return res.status(200).json({
        'statusCode': 200,
        'message': 'Product deleted Successfully',
        'data': deletedProduct
    });
}
