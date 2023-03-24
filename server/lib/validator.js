import Joi from "joi";
const validator = (schema) => (payload) => schema.validate(payload, {
    abourtEarly : false
});


const userSchema = Joi.object({
    name : Joi.string().required(),
    password : Joi.string().required(),
    email : Joi.string().required()
});

export const movieSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  releaseDate: Joi.date().required(),
  posterUrl: Joi.string().required(),
  featured: Joi.boolean(),
  actors : Joi.array().items(Joi.string()),
  bookings: Joi.array().items(Joi.string()),
  admin: Joi.string().required(),
});

