const mongoose = require('mongoose');
const ArtBeats = require("../models/postModel");
const data = require("./seed");

mongoose.connect("mongodb://127.0.0.1:27017/ArtBeats");
mongoose.connection.on("error",console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => { console.log("Database Connected"); });

const seedDB = async () => {
    await ArtBeats.deleteMany({});
    const modifiedData = data.map((item) => {
        const randomSeed = Math.floor(Math.random() * 1000000);
        const imageUrl = `https://picsum.photos/seed/${randomSeed}/200/300`;
        return{...item,author:'67de5d8ba03f70bba6871f29', image_url: imageUrl}
    });
    await ArtBeats.insertMany(modifiedData);
}
const DATA= seedDB();

console.log(DATA);