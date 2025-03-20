const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
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

const sessionConfig = {
  secret: 'thisshouldbeabetter',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,//to prevent from accessing the cookie from the client side
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
}
app.use(session(sessionConfig))
app.use(flash()); 
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

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