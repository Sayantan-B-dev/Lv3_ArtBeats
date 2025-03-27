const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require("../utils/catchAsync.js");
const {isLoggedIn,isAuthor,validateArtBeats,checkDailyPostLimit}=require('../middleware')
const ArtBeatsControl=require('../controllers/ArtBeatsController.js')
const multer  = require('multer')
const {storage}=require('../cloudinary')   //automatically looks for index.js
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(ArtBeatsControl.index))   //don't put semicolon in between chaining
    .post(isLoggedIn,upload.array('image_files'), validateArtBeats, catchAsync(ArtBeatsControl.createArt));

router.route('/newArt')   //this needs to start above :id
    .get(isLoggedIn , ArtBeatsControl.newArt);

router.route('/:id')
    .get(catchAsync(ArtBeatsControl.showEachArt))
    .put(isLoggedIn,isAuthor,upload.array('image_files'), validateArtBeats, catchAsync(ArtBeatsControl.updateEachArt))
    .delete(isLoggedIn,isAuthor, catchAsync(ArtBeatsControl.deleteEachArt));

router.route('/:id/editArt')
    .get(isLoggedIn,isAuthor, catchAsync(ArtBeatsControl.editEachArt));

module.exports = router;