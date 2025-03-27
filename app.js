if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

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
const mongoSanitize = require('express-mongo-sanitize');
const helmet=require('helmet')

const ArtBeats = require('./models/ArtModel.js')


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


// 🔹 helmet
const scriptSrcUrls = [
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net",
  "https://cdn.maptiler.com/", // ✅ Allow MapTiler scripts
];

const styleSrcUrls = [
  "https://kit-free.fontawesome.com/",
  "https://stackpath.bootstrapcdn.com/",
  "https://fonts.googleapis.com/", // ✅ Allow Google Fonts
  "https://use.fontawesome.com/",
  "https://cdn.jsdelivr.net",
  "https://cdn.maptiler.com/", // ✅ Allow MapTiler styles
];

const fontSrcUrls = [
  "https://fonts.gstatic.com/", // ✅ Allow Google Fonts
];

const connectSrcUrls = [
  "https://api.maptiler.com/", // ✅ Allow MapTiler API calls
];
const workerSrcUrls = [
  "'self'", 
  "blob:"
];//this allows the home page to run..donno why
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      workerSrc: workerSrcUrls,
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'self'", "'unsafe-inline'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      fontSrc: ["'self'", ...fontSrcUrls],
      imgSrc: [
        "'self'",
        "blob:",
        "data:",
        "https://res.cloudinary.com/",
        "https://api.maptiler.com/",
      ],
    },
  })
);

// 🔹 Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(mongoSanitize());//sanitizing mongo





// 🔹 Session Configuration (Before Passport)
const sessionConfig = {
  name:`__cf${Math.floor(Math.random()*1000000000)}`,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,//to prevent from accessing the cookie from the client side
    //secure:true,
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

app.get('/',async (req,res)=>{
  const Arts = await ArtBeats.find({})
  res.render('home', { Arts });
})

// 🔹 Error Handling
app.use((req, res, next) => {
  res.render('Arts/404error');
});
app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found!!', 404));
})
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  if (!err.message) err.message = 'Something went wrong!';
  res.status(statusCode).render('Arts/error', { err });
});

// 🔹 Start Server
app.listen(PORT, () => {
  console.log('listening to: ', PORT)
})