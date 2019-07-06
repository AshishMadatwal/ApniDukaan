const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Product = require('../models/product');


//addproduct
router.post('/addproducts', (req, res, next) => {
    let newProduct = new Product({
        productimage: req.body.productimage,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        subcategory: req.body.subcategory,
        price: req.body.price,
        quantity: req.body.quantity
    });

    Product.addProduct(newProduct, (err, product) => {
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


//output products
router.get('/getproduct', (req, res, next) => {
    Product.getproducts((err, doc) => {
        if (err) throw err;
        if (!doc) {
            return res.json({
                success: false,
                msg: 'products not found'
            });
        }
        return res.json(doc);
    });

});


router.get('/displayspecific/:cat', (req, res, next) => {
    console.log(req)
    const category = req.params.cat;

    Product.displaycategory(category, (err, doc) => {
        console.log(err);
        console.log(doc);
        if (err || doc.length == 0) {
            res.json({
                success: false,
                msg: 'category was not found',
                data: []
            });
        } else {
            res.json({
                success: true,
                msg: 'category found',
                data: doc
            });
        }
    })
});

router.get('/displaysubspecific/:cat/:cat1', (req, res, next) => {
    console.log(req)
    const category = req.params.cat;
    const subcategory = req.params.cat1;

    Product.displaysubcategory(category, subcategory, (err, doc) => {
        console.log(err);
        console.log(doc);
        if (err || doc.length == 0) {
            res.json({
                success: false,
                msg: 'category was not found',
                data: []
            });
        } else {
            res.json({
                success: true,
                msg: 'category found',
                data: doc
            });
        }
    })
});

module.exports = router;