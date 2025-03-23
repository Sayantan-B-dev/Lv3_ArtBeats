const { escapeXML } = require('ejs');
const { validate } = require('./models/commentModel');
const sanitizeHtml=require('sanitize-html')

const mainJoi=require('joi');
const extension=(Joi)=>({
  type:'string',
  base:Joi.string(),
  messages:{
    'string.escapeHTML':'{{#label}} must not include HTML'
  },
  rules:{
    escapeXML:{
      validate(value,helpers){
        const clean=sanitizeHtml(value,{
          allowedTags:[],
          allowedAttributes:{},
        })
        if(clean!==value) return helpers.error('string.escapeHTML',{value})
        return clean
      }
    }
  }
})
const Joi=mainJoi.extend(extension)

exports.ArtBeatsSchema = Joi.object({
    ArtBeats: Joi.object({
      title: Joi.string().trim().required().escapeXML(),
      description: Joi.string().trim().required().escapeXML(),
      location: Joi.string().trim().required().escapeXML(),
      artist_name: Joi.string().trim().required().escapeXML(),
      date_created: Joi.date().iso().required(),
      geometry: Joi.object({
        type: Joi.string().valid('Point').default('Point').required(), // Geometry type must always be 'Point'
        coordinates: Joi.array().items(Joi.number()).length(2).default([0, 0]).required() // Coordinates must be an array with exactly 2 numbers [longitude, latitude]
      }),
      images: Joi.array().items(
        Joi.object({
          url: Joi.string().uri().required(), // Image URL should be a valid URI
          filename: Joi.string().required().escapeXML(), // Image filename should be a non-empty string
        })
      ).min(1), // Ensuring at least one image is required
      deleteImages: Joi.array().items(Joi.string().escapeXML()), // Optional array of image filenames to delete
    }).required(),
    deleteImages: Joi.array().items(Joi.string().escapeXML()),
  });

module.exports.commentSchema = Joi.object({
  comment: Joi.object({
    body: Joi.string().trim().required().escapeXML(),
    rating: Joi.number().min(0).max(5).required()
  }).required()
})