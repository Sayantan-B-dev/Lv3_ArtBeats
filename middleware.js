const ArtBeats = require('./models/ArtModel.js');
const comments = require('./models/commentModel.js');
const { ArtBeatsSchema,commentSchema } = require('./schemas.js');
const ExpressError = require("./utils/ExpressErrors.js");


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

module.exports.isAuthor=async(req,res,next)=>{
    const {id}=req.params
    const Art = await ArtBeats.findById(id)
    if(!Art.author.equals(req.user._id)){
        req.flash('error','you do not have permission to do that')
        return res.redirect(`/ArtBeats/${id}`)
    }
    next()
}

module.exports.isCommentAuthor=async(req,res,next)=>{
    const {id,commentId}=req.params//commentId from the routes
    const comment = await comments.findById(commentId)
    if(!comment.author.equals(req.user._id)){
        req.flash('error','you do not have permission to do that')
        return res.redirect(`/ArtBeats/${id}`)
    }
    next()
}

module.exports.validateArtBeats = (req, res, next) => {
  const { error } = ArtBeatsSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const msg = error.details.map(el => el.message).join(', ');
    res.render('Arts/error', { statusCode: 400, message: msg });
  } else {
    next()
  }
}

module.exports.validateComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        return next(new ExpressError(msg, 400)); 
    }

    next(); 
};
