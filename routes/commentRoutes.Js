const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require("../utils/catchAsync.js");
const ArtBeats = require('../models/postModel.js');
const comments = require('../models/commentModel.js');
const { ArtBeatsSchema,commentSchema } = require('../schemas.js');


const validateComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        res.render('Arts/error', { statusCode: 400, message: msg });
    } else {
        next()
    }
}
router.post("/", validateComment, catchAsync(async (req, res, next) => {
    try {
        const Art = await ArtBeats.findById(req.params.id)
        const commentData = req.body.comment;
        const comment = new comments(commentData);
        Art.comments.push(comment);
        await comment.save();
        await Art.save();
        res.redirect(`/ArtBeats/${Art._id}`);
    } catch (err) {
        console.log(err)
    }
}));
router.delete("/:commentId", catchAsync(async (req, res, next) => {
    const { id, commentId } = req.params;
    await ArtBeats.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await comments.findByIdAndDelete(commentId);
    res.redirect(`/ArtBeats/${id}`);
}));

module.exports = router;