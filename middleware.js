module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.isLoggedIn=(req,res,next)=>{//theres a req.user in session
    if(!req.isAuthenticated()){
        req.session.returnTo =req.originalUrl
        req.flash('error','You must be signed in first!')
        return res.redirect('/login');//return it to be safe
    }
    next()
}
