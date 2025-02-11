const express = require('express');
const PORT = 3000;
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const methodoverride =require('method-override')
const StreetArt = require('./models/model');
const ejsMate=require('ejs-mate')


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


app.get('/', (req, res) => {
  try{
      res.render("test");
  } catch(e){
    next(e);
  } 
})
app.get('/AllStreetArts', async (req, res, next) => {
  try{
      const Arts = await StreetArt.find({})
      res.render('Arts/allArts', { Arts });
  } catch(e){
    next(e);
  } 
})
app.get('/AllStreetArts/newArt', (req, res) => {
  res.render('Arts/newArt');
});
app.post("/AllStreetArts", async (req, res, next) => {
  try{
    const newArt = new StreetArt(req.body);
    await newArt.save();
    res.redirect(`/AllStreetArts/${newArt._id}`);
  }catch(e){
    next(e);
  }
});


app.get('/AllStreetArts/:id', async (req, res, next) => {
  try{
    const { id } = req.params;
    const Art = await StreetArt.findById(id);
    res.render("Arts/eachArt", { Art });
  }catch(e){
    next(e);
  }
});

app.get("/AllStreetArts/:id/editArt", async (req, res, next) => {
  try{
    const { id } = req.params;
    const Art = await StreetArt.findById(id);
    res.render("Arts/editArt", { Art });
  }catch(e){
    next(e);
  }
});
app.put("/AllStreetArts/:id", async (req, res, next) => {
  try{
    const { id } = req.params;
    const Art = await StreetArt.findByIdAndUpdate(id, req.body, {
      runValidators: true,
    });
    res.redirect(`/AllStreetArts/${Art._id}`);
  }catch(e){
    next(e);
  }
});
app.delete("/AllStreetArts/:id", async (req, res, next) => {
  try{
    const { id } = req.params;
    const Art = await StreetArt.findByIdAndDelete(id);
    res.redirect(`/AllStreetArts`);
  }catch(e){
    next(e);
  }
});


app.use((req, res, next) => {
  res.send("404,Page not found");
});
app.use((err, req, res, next) => {
  res.send('something went wrong')
})
app.listen(PORT, () => {
    console.log('listening to: ',PORT)
})