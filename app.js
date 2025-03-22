const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const passport = require('passport');
const LocalStrategy = require('passport-local')


const ExpressError = require("./utils/ExpressErrors.js");
const User = require('./models/userModel'); 


// 🔹 MongoDB Connection
const MONGO_URI = 'mongodb://127.0.0.1:27017/ArtBeats';
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Database Connected Successfully');
  } catch (error) {
    console.error('❌ Database Connection Error:', error);
    process.exit(1);
  }
};
connectDB();
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB Disconnected. Reconnecting...');
  connectDB();
});

// 🔹 View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', ejsMate);


// 🔹 Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));


// 🔹 Session Configuration (Before Passport)
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

// 🔹 Passport Configuration (After Session)
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser()) //how to store in session
passport.deserializeUser(User.deserializeUser()) //how to un-store in session

// 🔹 Flash Messages Middleware (After Passport)
app.use((req, res, next) => {
  res.locals.currentUser=req.user
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

// 🔹 Routes
const ArtBeatsRoutes = require('./routes/ArtBeatsRoutes.js');
const CommentRoutes = require('./routes/commentRoutes.Js'); 
const UserRoutes = require('./routes/usersRoutes.js'); 
app.use('/',UserRoutes)
app.use('/ArtBeats', ArtBeatsRoutes);
app.use('/ArtBeats/:id/comment', CommentRoutes);

// 🔹 Error Handling
app.use((req, res, next) => {
  res.render('Arts/404error');
});
app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found!!', 404));
})
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render('Arts/error', { statusCode, message });
});

// 🔹 Start Server
app.listen(PORT, () => {
  console.log('listening to: ', PORT)
})