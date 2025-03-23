const mongoose = require('mongoose');
const ArtBeats = require("../models/ArtModel");
const data = require("./seed");

mongoose.connect("mongodb://127.0.0.1:27017/ArtBeats");
mongoose.connection.on("error",console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => { console.log("Database Connected"); });


const seedDB = async () => {
    //await ArtBeats.deleteMany({});
    const modifiedData = data.map((item) => {
        //const randomSeed = Math.floor(Math.random() * 1000000);
        //const image = `https://picsum.photos/seed/${randomSeed}/200/300`;
        // const images=[
        //     {
        //       url: 'https://res.cloudinary.com/dmzrjuzlt/image/upload/v1742656093/ArtBeats/paafqypve3q1ovpnrdhf.jpg',
        //       filename: 'ArtBeats/paafqypve3q1ovpnrdhf'
        //     },
        //     {
        //       url: 'https://res.cloudinary.com/dmzrjuzlt/image/upload/v1742656103/ArtBeats/zlpemxnbvqry3sd8vcdv.png',
        //       filename: 'ArtBeats/zlpemxnbvqry3sd8vcdv'
        //     }
        //   ]
        return{...item,author:'67de5d8ba03f70bba6871f29'}
    });
    await ArtBeats.insertMany(modifiedData);
}
seedDB().then(() => {
    console.log("Seeding completed!");
    mongoose.connection.close(); // Close connection after seeding
});