const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StreetArtSchema = new Schema({
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
});

module.exports = mongoose.model("StreetArt", StreetArtSchema);
