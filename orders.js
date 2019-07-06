const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Order = require('../models/order');



//add-to-cart
router.post('/addorder', (req, res, next) => {

    let newOrder = new Order({
        total: req.body.total,
        address: req.body.address



    });

    Order.addOrder(newOrder, (err, cart) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to insert product'
            });
        } else {
            res.json({
                success: true,
                msg: 'product inserted'
            });
        }
    });

});


router.get('/getcart', (req, res, next) => {
    Cart.getCart((err, doc) => {
        if (err) throw err;
        if (!doc) {
            return res.json({
                success: false,
                msg: 'Cart  not found'
            });
        }
        return res.json(doc);
    });

});


router.get('/delete/:_id', (req, res) => {
    Cart.findByIdAndRemove(req.params._id, (err, doc) => {
        console.log(doc)
        if (err) throw err;


        return res.json(doc);
    });
});
module.exports = router;