const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Check = require('../models/checkout');
const Product = require('../models/product');
const User = require('../models/user');


//add-to-cart
router.post('/checkout', (req, res, next) => {

    let newCheck = new Check({
        details: req.body.checkoutcart,
        total: req.body.total
    });

    Check.addcheck(newCheck, (err, cart) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to insert product'
            });
        } else {
            res.json({
                success: true,
                msg: 'data inserted'
            });
        }
    });

});




module.exports = router;