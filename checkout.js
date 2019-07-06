const mongoose = require('mongoose');
const config = require('../config/database');


const checkoutSchema = mongoose.Schema({
    details: {
        type: Array

    },


    total: {
        type: String
    }
    // address: {
    //     street: String,
    //     city: String,
    //     state: String,
    //     zip: Number
    // }

});
const Check = module.exports = mongoose.model('check', checkoutSchema);


module.exports.addcheck = function (newCheck, callback) {
    newCheck.save(callback);

}