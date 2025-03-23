const mongoose = require("mongoose");
const comment = require("./commentModel");
const Schema = mongoose.Schema;

const imageSchema=new Schema({
  url: { type: String, required: true },
  filename: { type: String, required: true }
})//this is genius ...


imageSchema.virtual('thumbnail').get(function(){
  return this.url.replace('/upload','/upload/w_200')//make sure to return it
})//new property thumbnail on image

const ArtBeatsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  artist_name: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now,
    required: true,
  },
  images: {
    type: [imageSchema],//this is genius ..
    default: undefined, // Prevents setting it as an empty array automatically
    validate: {
      validator: function (images) {
        return Array.isArray(images) && images.length > 0;
      },
      message: "At least one image is required!"
    }
  },//this is genius ...it prevents submitting empty array
  author:{
    type:Schema.Types.ObjectId,
    ref:'User'//it enables .populate('author')
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

ArtBeatsSchema.post("findOneAndDelete", async function (doc) {
  if(doc){
    await comment.deleteMany({
      _id:  {
        $in: doc.comments
      }
    });
  }
});
module.exports = mongoose.model("ArtBeats", ArtBeatsSchema);
