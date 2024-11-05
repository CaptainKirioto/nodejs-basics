import Joi from 'joi';
import { genderList } from '../constants/contacts.js';

export const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Write the name, please',
  }),
  phone: Joi.string(),
  email: Joi.string().required().messages({
    'any.required': 'Write the email, please',
  }),
  job: Joi.string().required().messages({
    'any.required': 'Write the job, please',
  }),
  gender: Joi.string().valid(...genderList),
});

export const contactsUpdateSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
  job: Joi.string(),
  gender: Joi.string().valid(...genderList),
});