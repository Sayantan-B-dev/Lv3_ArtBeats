const ArtBeats = require('../models/ArtModel.js');
const {cloudinary}=require('../cloudinary')

module.exports.index=async (req, res, next) => {
    const Arts = await ArtBeats.find({})
    res.render('Arts/allArts', { Arts });
}

module.exports.newArt=(req, res) => {
    res.render('Arts/newArt');
}

module.exports.createArt=async (req, res, next) => {
    try {
        const newArt = new ArtBeats(req.body.ArtBeats);
        newArt.images=req.files.map(f=>({
            url: f.path,
            filename: f.filename
        }))
        newArt.author=req.user._id//added to track each author..its newArt.author and req.user._id note this
        await newArt.save();
        req.flash('success', 'Successfully posted new Art!');
        res.redirect(`/ArtBeats/${newArt._id}`);
    } catch (err) {
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
    const updatedArt = await ArtBeats.findByIdAndUpdate(
        id, 
        { ...req.body.ArtBeats }, 
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
    updatedArt.images.push(...imgs)
    await updatedArt.save()

    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename)
        }
        await updatedArt.updateOne({
            $pull:{images:{filename:{$in: req.body.deleteImages}}}
        })
    }
    
    req.flash('success', 'Successfully updated Art!');
    res.redirect(`/ArtBeats/${updatedArt._id}`);
}

module.exports.deleteEachArt=async (req, res, next) => {
    const { id } = req.params;
    const Art = await ArtBeats.findByIdAndDelete(id);
    if (!Art) {
        req.flash('error', 'Art not found');
        return res.redirect('/ArtBeats');
    }
    req.flash('success', 'Successfully deleted Art!');
    res.redirect(`/ArtBeats`);
}