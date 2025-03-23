const Joi=require('joi')

exports.ArtBeatsSchema = Joi.object({
    ArtBeats: Joi.object({
      title: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      location: Joi.string().trim().required(),
      artist_name: Joi.string().trim().required(),
      date_created: Joi.date().iso().required(),
      // images: Joi.string().uri().required()
    }).required(),
    deleteImages:Joi.array()
  });

module.exports.commentSchema = Joi.object({
  comment: Joi.object({
    body: Joi.string().trim().required(),
    rating: Joi.number().min(0).max(5).required()
  }).required()
})