const mongoose = require('mongoose');
const StreetArt = require("../models/model");
const data = require("./seed");

mongoose.connect("mongodb://127.0.0.1:27017/StreetArt");
mongoose.connection.on("error",console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => { console.log("Database Connected"); });

const seedDB = async () => {
    await StreetArt.deleteMany({});
    StreetArt.insertMany(data);
}

const DATA= seedDB();

console.log(DATA);