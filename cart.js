const mongoose = require('mongoose');
const config = require('../config/database');
const Product = require('../models/product');

const cartSchema = mongoose.Schema({
    userid: {
        type: String

    },
    product: {
        type: String
    },

    quantity: {
        type: String
    }
    // address: {
    //     street: String,
    //     city: String,
    //     state: String,
    //     zip: Number
    // }

});
const Cart = module.exports = mongoose.model('cart', cartSchema);


module.exports.addCart = function (newCart, callback) {
    newCart.save(callback);

}
module.exports.getCart = function (callback) {
    Cart.find(callback);
}