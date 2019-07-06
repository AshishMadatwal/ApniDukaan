const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Admin = require('../models/admin');


// Register Admin
router.post('/registeradmin', (req, res, next) => {
    let newAdmin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        mobile: req.body.mobile
    });

    Admin.addAdmin(newAdmin, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to register user'
            });
        } else {
            res.json({
                success: true,
                msg: 'User registered'
            });
        }
    });
});
// Authenticate Admin
router.post('/authlogin', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    Admin.getAdminByUsername(email, (err, admin) => {
        if (err) throw err;
        if (!admin) {
            return res.json({
                success: false,
                msg: 'User not found'
            });
        }
        Admin.comparePassword(password, admin.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({
                    data: admin
                }, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: `Bearer ${token}`,
                    admin: {
                        id: admin._id,
                        name: admin.name,
                        email: admin.email,
                        username: admin.username,
                        mobile: admin.mobile
                    }
                });
            } else {
                return res.json({
                    success: false,
                    msg: 'Wrong password'
                });
            }
        });
    });
});



// Profile Admin
router.get('/profileadmin', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    res.json({
        admin: req.admin
    });
});



module.exports = router;