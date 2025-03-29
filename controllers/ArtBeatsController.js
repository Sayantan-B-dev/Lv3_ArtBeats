const ArtBeats = require('../models/ArtModel.js');
const {cloudinary}=require('../cloudinary')
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

module.exports.index=async (req, res, next) => {
    const Arts = await ArtBeats.find({})
    res.render('Arts/allArts', { Arts });
}

module.exports.newArt=(req, res) => {
    res.render('Arts/newArt');
}


module.exports.createArt=async (req, res, next) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const dailyPostsCount = await ArtBeats.countDocuments({
            author: req.user._id,
            date_created: { $gte: startOfDay, $lte: endOfDay }
        });
        if (dailyPostsCount >= 3) {
            req.flash('error', 'You have reached your daily limit of 3 posts.');
            return res.redirect('/ArtBeats');
        }

        console.log('Daily Posts Count:', dailyPostsCount);
        const geoData = await maptilerClient.geocoding.forward(req.body.ArtBeats.location, { limit: 1 });
        const newArt = new ArtBeats(req.body.ArtBeats);
        newArt.geometry = geoData.features.length ? geoData.features[0].geometry : { type: 'Point', coordinates: [0, 0] };
        newArt.images = req.files.map(f => ({
            url: f.path,
            filename: f.filename
        }));

        newArt.date_created = new Date();
        newArt.author = req.user._id; // added to track each author
        await newArt.save();

        req.flash('success', 'Successfully posted new Art!');
        res.redirect(`/ArtBeats/${newArt._id}`);

    } catch (err) {
        console.error('Error in createArt:', err);
        next(err);
    }
}

module.exports.showEachArt=async (req, res, next) => {
    const { id } = req.params;
    const Art = await ArtBeats.findById(id)
                .populate({
                    path:'comments',
                    populate:{
                        path:'author'
                    }
                })//nested populate
                .populate('author');
    if(!Art){
        req.flash('error', 'Cannot find that Art!');
        return res.redirect('/ArtBeats');
    }
    res.render("Arts/eachArt", { Art });
}

module.exports.editEachArt=async (req, res, next) => {
    const { id } = req.params;
    const Art = await ArtBeats.findById(id);
    if(!Art){
        req.flash('error', 'Cannot find that Art!');
        return res.redirect('/ArtBeats');
    }
    req.flash('success', 'Successfully edited!');
    res.render("Arts/editArt", { Art });
}

module.exports.updateEachArt=async (req, res, next) => {
    const { id } = req.params;

    const geoData = await maptilerClient.geocoding.forward(req.body.ArtBeats.location, { limit: 1 });
    
    const updatedArt = await ArtBeats.findByIdAndUpdate(
        id, 
        {
            ...req.body.ArtBeats ,
            geometry: geoData.features.length ? geoData.features[0].geometry : {type: 'Point',coordinates: [0, 0]}
        }, // Add geometry inside update
        {runValidators: true,new: true}
    );

    
    if (!updatedArt) {
        req.flash('error', 'Art not found or you do not have permission to edit it.');
        return res.redirect('/ArtBeats');
    }

    const imgs=req.files.map(f=>({
        url: f.path,
        filename: f.filename
    }))
    const totalImages = updatedArt.images.length + imgs.length;
    if (totalImages > 3) {
        req.flash('error', 'You can only have up to 3 images for an artwork.');
        return res.redirect(`/ArtBeats/${updatedArt._id}`);
    }

    updatedArt.images.push(...imgs)

    if(req.body.deleteImages){
        await updatedArt.updateOne({
            $pull:{images:{filename:{$in: req.body.deleteImages}}}
        })
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename)
        }
    }

    await updatedArt.save()
    
    req.flash('success', 'Successfully updated Art!');
    res.redirect(`/ArtBeats/${updatedArt._id}`);
}

module.exports.deleteEachArt=async (req, res, next) => {
    const { id } = req.params;
    const Art = await ArtBeats.findByIdAndDelete(id);
    for (let img of Art.images) {
        try {
          await cloudinary.uploader.destroy(img.filename);
        } catch (error) {
          console.error('Cloudinary deletion error:', error);
        }
      }//fixed it 
    if (!Art) {
        req.flash('error', 'Art not found');
        return res.redirect('/ArtBeats');
    }
    req.flash('success', 'Successfully deleted Art!');
    res.redirect(`/ArtBeats`);
}