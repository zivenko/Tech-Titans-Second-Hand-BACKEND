import Joi from "joi";

export const createContactsSchema = Joi.object({
  user: Joi.string().required(),
  content: Joi.string().required(),
});


export const updateContactsStatusSchema = Joi.object({
  is_read: Joi.boolean().required(),
});
