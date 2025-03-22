const ArtBeats = require('../models/ArtModel.js');
const comments = require('../models/commentModel.js');

module.exports.createComment=async (req, res, next) => {
    try {
        const Art = await ArtBeats.findById(req.params.id)
        const commentData = req.body.comment;
        const newComment = new comments(commentData);
        newComment.author=req.user._id//important
        
        Art.comments.push(newComment);
        await newComment.save();
        await Art.save();
        req.flash('success', 'Successfully added comment!');
        res.redirect(`/ArtBeats/${Art._id}`);
    } catch (err) {
        console.log(err)
    }
}

module.exports.deleteComment=async (req, res, next) => {
    const { id, commentId } = req.params;
    await ArtBeats.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await comments.findByIdAndDelete(commentId);
    res.redirect(`/ArtBeats/${id}`);
}

