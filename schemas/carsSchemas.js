import Joi from "joi";

export const createCarSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

export const updateCarSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
})
  .min(1)
  .required()
  .messages({ "object.min": "You must have at least 1 field" });

export const updateCarStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
