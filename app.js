
const express = require('express');
const PORT = 3000;
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const ExpressError = require("./utils/ExpressErrors.js");
const ArtBeatsRoutes = require('./routes/ArtBeats'); 
const CommentRoutes = require('./routes/Comment.Js'); 


mongoose.connect('mongodb://127.0.0.1:27017/ArtBeats');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => { console.log('Database Connected'); });


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', ejsMate);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));


app.use('/ArtBeats', ArtBeatsRoutes);
app.use('/ArtBeats/:id/comment', CommentRoutes);







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