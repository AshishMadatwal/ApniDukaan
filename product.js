const mongoose = require('mongoose');

const config = require('../config/database');

// User Schema
const ProductSchema = mongoose.Schema({
    productimage: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number
    }

});
const Product = module.exports = mongoose.model('product', ProductSchema);

module.exports.addProduct = function (newProduct, callback) {

    newProduct.save(callback);

}
module.exports.displaycategory = function (category, callback) {

    Product.find({
        "category": category
    }, callback) ;
}
module.exports.displaysubcategory = function (category, subcategory, callback) {

    Product.find({
        "category": category,
        "subcategory": subcategory
    }, callback);
}

module.exports.getproducts = function (callback) {
    Product.find(callback);
}