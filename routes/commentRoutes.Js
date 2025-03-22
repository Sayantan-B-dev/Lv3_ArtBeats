const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require("../utils/catchAsync.js");
const ArtBeats = require('../models/ArtModel.js');
const comments = require('../models/commentModel.js');
const commentControl=require('../controllers/commentController.js')
const {isLoggedIn,isCommentAuthor,validateComment}=require('../middleware')



router.route("/")
    .post(isLoggedIn, validateComment, catchAsync(commentControl.createComment));
router.route("/:commentId")
    .delete(isLoggedIn,isCommentAuthor, catchAsync(commentControl.deleteComment));

module.exports = router;