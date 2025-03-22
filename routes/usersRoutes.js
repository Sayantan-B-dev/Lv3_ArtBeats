const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync.js')
const User = require('../models/userModel.js');
const { storeReturnTo } = require('../middleware');

router.get('/register', (req, res) => {
    res.render('users/register')
})
router.post('/register', async (req, res) => {//,next is optional here since we will flash the error message
    try {
        const { username, email, password } = req.body
        const newUser = new User({ email, username })
        const registeredUser = await User.register(newUser, password)
        req.login(registeredUser, function (err) {
            if (err) { return next(err); }
            req.flash('success', 'Welcome to ArtBeats')
            res.redirect('/ArtBeats')
        });//it will help with login..so you dont have to login after registering again
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/register')
    }
})


router.get('/login', (req, res) => {
    res.render('users/login')
})
router.post(
    '/login',
    storeReturnTo, 
    passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), 
    (req, res) => {//IMPORTANT
    req.flash('success', 'Welcome back to ArtBeats')
    const redirectUrl=res.locals.returnTo
    delete req.session.returnTo
    res.redirect(redirectUrl)
})

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err);
        req.flash('success', 'Goodbye!');
        res.redirect('/ArtBeats');
    });
});

module.exports = router