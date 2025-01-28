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
  },
  date_created: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("StreetArt", StreetArtSchema);
