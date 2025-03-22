const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require("../utils/catchAsync.js");
const ExpressError = require("../utils/ExpressErrors.js");
const ArtBeats = require('../models/postModel.js');
const { ArtBeatsSchema,commentSchema } = require('../schemas.js');
const {isLoggedIn}=require('../middleware')


const validateArtBeats = (req, res, next) => {
  const { error } = ArtBeatsSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const msg = error.details.map(el => el.message).join(', ');
    res.render('Arts/error', { statusCode: 400, message: msg });
  } else {
    next()
  }
}

router.get('/', catchAsync(async (req, res, next) => {
    const Arts = await ArtBeats.find({})
    res.render('Arts/allArts', { Arts });
}));
router.get('/newArt', isLoggedIn , (req, res) => {
    res.render('Arts/newArt');
});
router.post("/", isLoggedIn, validateArtBeats, catchAsync(async (req, res, next) => {
    try {
        console.log(req.body);
        const newArt = new ArtBeats(req.body.ArtBeats);
        await newArt.save();
        req.flash('success', 'Successfully posted new Art!');
        res.redirect(`/ArtBeats/${newArt._id}`);
    } catch (err) {
        next(err);
    }
}));



router.get('/:id',  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const Art = await ArtBeats.findById(id).populate('comments');
    if(!Art){
        req.flash('error', 'Cannot find that Art!');
        return res.redirect('/ArtBeats');
    }
    res.render("Arts/eachArt", { Art });
}));

router.get("/:id/editArt", isLoggedIn, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const Art = await ArtBeats.findById(id);
    if(!Art){
        req.flash('error', 'Cannot find that Art!');
        return res.redirect('/ArtBeats');
    }
    req.flash('success', 'Successfully posted new Art!');
    res.render("Arts/editArt", { Art });
}));

router.put("/:id", isLoggedIn, validateArtBeats, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updatedArt = await ArtBeats.findByIdAndUpdate(id, { ...req.body.ArtBeats }, {
        runValidators: true,
        new: true
    });
    if (!updatedArt) {
        throw new ExpressError("Art not found", 404);
    }
    req.flash('success', 'Successfully updated Art!');
    res.redirect(`/ArtBeats/${updatedArt._id}`);
}));


router.delete("/:id", isLoggedIn, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const Art = await ArtBeats.findByIdAndDelete(id);
    if (!Art) {
        throw new ExpressError("Art not found", 404);
    }
    req.flash('success', 'Successfully deleted Art!');
    res.redirect(`/ArtBeats`);
}));

module.exports = router;