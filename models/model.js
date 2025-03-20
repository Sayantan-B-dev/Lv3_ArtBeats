const mongoose = require("mongoose");
const comment = require("./comment");
const Schema = mongoose.Schema;

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
  image_url: {
    type: String,
    required: true,
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
