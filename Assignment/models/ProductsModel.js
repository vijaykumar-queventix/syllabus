const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const categorySchema = new Schema({
    categoryId : ObjectId,
    catalog : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'catelog',
        default : 'test default'
    },
    categoryName: {
        type: String,
        default: 'Category Name'
    },
    categoryImage: {
        type: String,
        default: 'img.jpg'
    },
    status: {
        type: Number,
        default: 0
    }
});



const productschema = new mongoose.Schema({
     
    productId : mongoose.Schema.Types.ObjectId,
    productName: {
        type: String,
        default: 'Product'
    },
    category: {
        type: String,
        default: 'Super category'
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    product_image: {
        type: String,
        default: 'imag.jpg'

    },
    description: {
        type: String,
        default: 'Product Description'

    },
    unit: {
        type: Number,
        default: 1

    },
    selling_price: {
        type: Number,
        default: 0

    },
    status: {
        type: Number,
        default: 0

    },
    created_on: {
        type: Date,
        default: Date.now()

    },
    updated_on: {
        type: Date,
        default: Date.now()

    }

});

let categoryModel = mongoose.model('categories', categorySchema)
let productModel = mongoose.model('products', productschema)
module.exports = { categoryModel, productModel };


// for schema example url
// https://stackoverflow.com/questions/44715430/how-can-i-design-schema-for-below-product-using-mongoose/44758079