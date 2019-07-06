const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');


//add-to-cart
router.post('/add-to-cart', (req, res, next) => {

    let newCart = new Cart({
        product: req.body.product,
        userid: req.body.userid,
        quantity: req.body.quantity


    });

    Cart.addCart(newCart, (err, cart) => {
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