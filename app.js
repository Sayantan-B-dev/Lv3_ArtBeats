const express = require('express');
const PORT = 3002;
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const methodoverride =require('method-override')
const StreetArt = require('./models/model');
const ejsMate = require('ejs-mate')
const catchAsync = require("./utils/catchAsync.js");
const ExpressError = require("./utils/ExpressErrors.js");
const Joi = require('joi');


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
  const allArtSchema = Joi.object({
    StreetArt: Joi.object({
      title: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      location: Joi.string().trim().required(),
      artist_name: Joi.string().trim().required(),
      date_created: Joi.date().iso().required(),
      image_url: Joi.string().uri().required()
    })
  });

  const { error } = allArtSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const msg = error.details.map(el => el.message).join(', ');
    return res.status(400).json({ error: msg });
  }

  try {
    console.log(req.body);
    const newArt = new StreetArt(req.body.StreetArt);
    await newArt.save();
    res.redirect(`/AllStreetArts/${newArt._id}`);
  } catch (err) {
    next(err);
  }
}));
;


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
  console.log("Received Data:", req.body); // Check what is being received

  const { id } = req.params;
  const updatedArt = await StreetArt.findByIdAndUpdate(id, req.body.StreetArt, {
    runValidators: true,
    new: true
  });

  if (!updatedArt) {
    throw new ExpressError("Art not found", 404);
  }

  console.log("Updated Art:", updatedArt); // Check if update worked
  res.redirect(`/AllStreetArts/${updatedArt._id}`);
}));


app.delete("/AllStreetArts/:id", catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const Art = await StreetArt.findByIdAndDelete(id);
    res.redirect(`/AllStreetArts`);
}));



app.use((req, res, next) => {
  res.render('Arts/404error');
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render('Arts/error', { statusCode, message });
});
app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found!!',404));

})
app.listen(PORT, () => {
    console.log('listening to: ',PORT)
})