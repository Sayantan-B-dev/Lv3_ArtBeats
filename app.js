const express = require('express');
const PORT = 3000;
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const methodoverride =require('method-override')
const StreetArt = require('./models/model');
const ejsMate = require('ejs-mate')
const catchAsync = require("./utils/catchAsync.js");
const ExpressError = require("./utils/ExoressErrors.js");


mongoose.connect('mongodb://127.0.0.1:27017/StreetArt');
mongoose.connection.on('error',console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => { console.log('Database Connected'); });



app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))

app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodoverride('_method'));
app.use(express.json());


app.get('/', catchAsync((req, res) => {
  res.render("test");
}));
app.get('/AllStreetArts', catchAsync(async (req, res, next) => {
  const Arts = await StreetArt.find({})
  res.render('Arts/allArts', { Arts });
}));
app.get('/AllStreetArts/newArt', (req, res) => {
  res.render('Arts/newArt');
});
app.post("/AllStreetArts", catchAsync(async (req, res, next) => {
  if(!req.body.StreetArt) throw new ExpressError("invalid Data",400)
    const newArt = new StreetArt(req.body);
    await newArt.save();
    res.redirect(`/AllStreetArts/${newArt._id}`);
}));


app.get('/AllStreetArts/:id', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const Art = await StreetArt.findById(id);
    res.render("Arts/eachArt", { Art });
}));

app.get("/AllStreetArts/:id/editArt", catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const Art = await StreetArt.findById(id);
    res.render("Arts/editArt", { Art });
}));
app.put("/AllStreetArts/:id", catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const Art = await StreetArt.findByIdAndUpdate(id, req.body, {
      runValidators: true,
    });
    res.redirect(`/AllStreetArts/${Art._id}`);
}));
app.delete("/AllStreetArts/:id", catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const Art = await StreetArt.findByIdAndDelete(id);
    res.redirect(`/AllStreetArts`);
}));


app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found!!',404));
})
app.use((req, res, next) => {
  res.send("404,Page not found");
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "something went wrong" }=err;
  res.status(statusCode).send(message);
})
app.listen(PORT, () => {
    console.log('listening to: ',PORT)
})