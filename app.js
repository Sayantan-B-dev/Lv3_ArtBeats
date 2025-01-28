const express = require('express');
const PORT = 3000;
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const methodoverride =require('method-override')
const StreetArt = require('./models/model');


mongoose.connect('mongodb://127.0.0.1:27017/StreetArt');
mongoose.connection.on('error',console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => { console.log('Database Connected'); });



app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodoverride('_method'));
app.use(express.json());




app.get('/', (req, res) => {
    res.render('test')
})
app.get('/AllStreetArts', async(req, res) => {
    const Arts = await StreetArt.find({})
    res.render('Arts/allArts', { Arts });
})
app.get('/AllStreetArts/newArt', (req, res) => {
  res.render('Arts/newArt');
});
app.post("/AllStreetArts", async (req, res) => {
    const newArt = new StreetArt(req.body);
    await newArt.save();
    res.redirect(`/AllStreetArts/${newArt._id}`);
});


app.get('/AllStreetArts/:id', async (req, res) => {
    const { id } = req.params;
    const Art = await StreetArt.findById(id);
    res.render('Arts/eachArt', { Art });
});

app.get("/AllStreetArts/:id/editArt", async (req, res) => {
  const { id } = req.params;
  const Art = await StreetArt.findById(id);
  res.render("Arts/editArt", { Art });
});
app.put("/AllStreetArts/:id", async (req, res) => {
  const { id } = req.params;
  const Art = await StreetArt.findByIdAndUpdate(id, req.body, {runValidators: true,});
  res.redirect(`/AllStreetArts/${Art._id}`);
});
app.delete("/AllStreetArts/:id", async (req, res) => {
  const { id } = req.params;
  const Art = await StreetArt.findByIdAndDelete(id);
  res.redirect(`/AllStreetArts`);
});




app.listen(PORT, () => {
    console.log('listening to: ',PORT)
})