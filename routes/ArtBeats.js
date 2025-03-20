const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require("../utils/catchAsync.js");
const ExpressError = require("../utils/ExpressErrors.js");
const ArtBeats = require('../models/model.js');
const { ArtBeatsSchema,commentSchema } = require('../schemas.js');


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
router.get('/newArt', (req, res) => {
    res.render('Arts/newArt');
});
router.post("", validateArtBeats, catchAsync(async (req, res, next) => {
    try {
        console.log(req.body);
        const newArt = new ArtBeats(req.body.ArtBeats);
        await newArt.save();
        res.redirect(`/ArtBeats/${newArt._id}`);
    } catch (err) {
        next(err);
    }
}));
;


router.get('/:id', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const Art = await ArtBeats.findById(id).populate('comments');
    res.render("Arts/eachArt", { Art });
}));

router.get("/:id/editArt", catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const Art = await ArtBeats.findById(id);
    res.render("Arts/editArt", { Art });
}));

router.put("/:id", validateArtBeats, catchAsync(async (req, res, next) => {
    console.log("Received Data:", req.body);

    const { id } = req.params;
    const updatedArt = await ArtBeats.findByIdAndUpdate(id, { ...req.body.ArtBeats }, {
        runValidators: true,
        new: true
    });

    if (!updatedArt) {
        throw new ExpressError("Art not found", 404);
    }

    console.log("Updated Art:", updatedArt); 
    res.redirect(`/ArtBeats/${updatedArt._id}`);
}));


router.delete("/:id", catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const Art = await ArtBeats.findByIdAndDelete(id);
    res.redirect(`/ArtBeats`);
}));

module.exports = router;