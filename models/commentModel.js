const { number } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    body: {
        type: String,
        default: "No Comment",
        required: true
    },
    rating: {
        type: Number,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports = mongoose.model("Comment", commentSchema);
