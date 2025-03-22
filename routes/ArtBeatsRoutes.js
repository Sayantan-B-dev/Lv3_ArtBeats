const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require("../utils/catchAsync.js");
const ArtBeats = require('../models/ArtModel.js');
const {isLoggedIn,isAuthor,validateArtBeats}=require('../middleware')
const ArtBeatsControl=require('../controllers/ArtBeatsController.js')

router.route('/')
    .get(catchAsync(ArtBeatsControl.index))//don't put semicolon in between chaining
    .post(isLoggedIn, validateArtBeats, catchAsync(ArtBeatsControl.createArt));

router.route('/newArt')//this needs to star above :id
    .get(isLoggedIn , ArtBeatsControl.newArt);

router.route('/:id')
    .get(catchAsync(ArtBeatsControl.showEachArt))
    .put(isLoggedIn,isAuthor, validateArtBeats, catchAsync(ArtBeatsControl.updateEachArt))
    .delete(isLoggedIn,isAuthor, catchAsync(ArtBeatsControl.deleteEachArt));

router.route('/:id/editArt')
    .get(isLoggedIn,isAuthor, catchAsync(ArtBeatsControl.editEachArt));

module.exports = router;