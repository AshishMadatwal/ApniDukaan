const mongoose = require('mongoose');


const OrderSchema = mongoose.Schema({
    address: {
        type: String

    },
    total: {
        type: String
    },
});
const Order = module.exports = mongoose.model('order', OrderSchema);


module.exports.addOrder = function (newOrder, callback) {
    newOrder.save(callback);
}