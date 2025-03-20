const mongoose = require('mongoose');
const ArtBeats = require("../models/model");
const data = require("./seed");

mongoose.connect("mongodb://127.0.0.1:27017/ArtBeats");
mongoose.connection.on("error",console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => { console.log("Database Connected"); });

const seedDB = async () => {
    await ArtBeats.deleteMany({});
    
    const modifiedData = data.map((item) => {
        const randomSeed = Math.floor(Math.random() * 1000000);
        const imageUrl = `https://picsum.photos/seed/${randomSeed}/200/300`;
        return{...item, image_url: imageUrl}
    });
    await ArtBeats.insertMany(modifiedData);
}
const DATA= seedDB();

console.log(DATA);