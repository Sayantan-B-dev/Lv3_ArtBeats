const Joi=require('joi')
const fallbackCoordinates = [37.563936, -116.85123];


exports.ArtBeatsSchema = Joi.object({
    ArtBeats: Joi.object({
      title: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      location: Joi.string().trim().required(),
      artist_name: Joi.string().trim().required(),
      date_created: Joi.date().iso().required(),
      geometry: Joi.object({
        type: Joi.string().valid('Point').default('Point').required(), // Geometry type must always be 'Point'
        coordinates: Joi.array().items(Joi.number()).length(2).default([0, 0]).required() // Coordinates must be an array with exactly 2 numbers [longitude, latitude]
      }),
      images: Joi.array().items(
        Joi.object({
          url: Joi.string().uri().required(), // Image URL should be a valid URI
          filename: Joi.string().required() // Image filename should be a non-empty string
        })
      ).min(1), // Ensuring at least one image is required
      deleteImages: Joi.array().items(Joi.string()), // Optional array of image filenames to delete
    }).required(),
    deleteImages: Joi.array().items(Joi.string()),
  });

module.exports.commentSchema = Joi.object({
  comment: Joi.object({
    body: Joi.string().trim().required(),
    rating: Joi.number().min(0).max(5).required()
  }).required()
})