
const express = require('express');
const PORT = 3000;
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override')
const StreetArt = require('./models/model');
const ejsMate = require('ejs-mate')
const catchAsync = require("./utils/catchAsync.js");
const ExpressError = require("./utils/ExpressErrors.js");
const { StreetArtSchema,commentSchema } = require('./schemas');
const comments = require('./models/comment');


mongoose.connect('mongodb://127.0.0.1:27017/StreetArt');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => { console.log('Database Connected'); });



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.engine('ejs', ejsMate);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));

const validateStreetArt = (req, res, next) => {

  const { error } = StreetArtSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const msg = error.details.map(el => el.message).join(', ');
    res.render('Arts/error', { statusCode: 400, message: msg });
  } else {
    next()
  }
}

const validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const msg = error.details.map(el => el.message).join(', '); 
    res.render('Arts/error', { statusCode: 400, message: msg });
  } else {
    next()
  }
}

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
app.post("/AllStreetArts",validateStreetArt, catchAsync(async (req, res, next) => {

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
  const Art = await StreetArt.findById(id).populate('comments');
  res.render("Arts/eachArt", { Art });
}));

app.get("/AllStreetArts/:id/editArt", catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const Art = await StreetArt.findById(id);
  res.render("Arts/editArt", { Art });
}));

app.put("/AllStreetArts/:id",validateStreetArt, catchAsync(async (req, res, next) => {
  console.log("Received Data:", req.body);

  const { id } = req.params;
  const updatedArt = await StreetArt.findByIdAndUpdate(id, {...req.body.StreetArt}, {
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

app.post("/AllStreetArts/:id/comment",validateComment, catchAsync(async (req, res, next) => {
  try {
    const Art = await StreetArt.findById(req.params.id)
    const commentData = req.body.comment;
    const comment = new comments(commentData);
    Art.comments.push(comment);
    await comment.save();
    await Art.save();
    res.redirect(`/AllStreetArts/${Art._id}`);
  } catch (err) {
    console.log(err)
  }
}));

app.delete("/AllStreetArts/:id/comment/:commentId", catchAsync(async (req, res, next) => {
  const { id, commentId } = req.params;
  await StreetArt.findByIdAndUpdate(id,{$pull:{comments:commentId}}); 
  await comments.findByIdAndDelete(commentId);
  res.redirect(`/AllStreetArts/${id}`);
}));


app.use((req, res, next) => {
  res.render('Arts/404error');
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render('Arts/error', { statusCode, message });
});
app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found!!', 404));
})
app.listen(PORT, () => {
  console.log('listening to: ', PORT)
})