const express = require('express');
const router = express.Router();
const passport = require('passport');
const userControl=require('../controllers/userController.js')
const { storeReturnTo } = require('../middleware');

router.route('/register')
    .get(userControl.registerForm)
    .post(userControl.userRegister)

router.route('/login')
    .get( userControl.loginForm)
    .post(
        storeReturnTo, 
        passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), 
        userControl.userLogin
    )

router.route('/logout')
    .get(userControl.logout);

module.exports = router