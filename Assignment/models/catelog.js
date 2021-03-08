const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
    catalogId : mongoose.Schema.Types.ObjectId,
    catalogName: {
        type: String,
        default: 'Catalog Name'
    },
    category: {
        categoryId: {
            type : mongoose.Schema.Types.ObjectId,
            default : mongoose.Schema.Types.ObjectId
        }
        ,
        // catalogId: {
        //     type: mongoose.Schema.Types.ObjectId,
        // },
        categoryName: {
            type: String,
            default: 'Super Category'
        },
        categoryImage: {
            type: String,
            default: 'img.jpg'
        },
        status: {
            type: Number,
            default: 0
        },
        created_on: {
            type: Date,
            default: Date.now()
        },
        modified_on: {
            type: Date,
            default: Date.now()
        },
        subcategory: {
            subcategoryId : mongoose.Schema.Types.ObjectId,
            // categoryId: {
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: categoryId
            // },
            subcategoryName: {
                type: String,
                default: "Sub category"
            },
            status: {
                type: Number,
                default: 0
            },
            products: {
                productId : mongoose.Schema.Types.ObjectId,
                productName: {
                    type: String,
                    default: 'product'
                },
                selling_price: {
                    type: Number,
                    default: 0
                },
                unit: {
                    type: Number,
                    default: 1
                },
                quantity: {
                    type: Number,
                    default: 0
                },
                product_details: {
                    type: String,
                    default: 'product details'
                },
                MRP: {
                    type: Number,
                    default: 0
                },
                product_image: {
                    type: String,
                    default: 'img.jpeg'
                },
                status: {
                    type: Number,
                    default: 0
                },
                created_on: {
                    type: Date,
                    default: Date.now()
                },
                modified_on: {
                    type: Date,
                    default: Date.now()
                }

            }

        }
    }
});

module.exports = mongoose.model('catelog', catalogSchema);