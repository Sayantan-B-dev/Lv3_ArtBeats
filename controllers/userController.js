const User = require('../models/userModel.js');

module.exports.registerForm=(req, res) => {
    res.render('users/register')
}
module.exports.userRegister=async (req, res) => {//,next is optional here since we will flash the error message
    try {
        const { username, email, password } = req.body
        const newUser = new User({ email, username })
        const registeredUser = await User.register(newUser, password)
        req.login(registeredUser, function (err) {
            if (err) { return next(err); }
            req.flash('success', 'Welcome to ArtBeats')
            res.redirect('/')
        });//it will help with login..so you dont have to login after registering again
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/register')
    }
}

module.exports.loginForm=(req, res) => {
    res.render('users/login')
}
module.exports.userLogin=(req, res) => {//IMPORTANT
    req.flash('success', 'Welcome back to ArtBeats')
    const redirectUrl=res.locals.returnTo || '/ArtBeats'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}


module.exports.logout=(req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err);
        req.flash('success', 'Goodbye!');
        console.log(req.flash('success'));
        res.redirect('/');
    });
}