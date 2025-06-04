import Joi from "joi";

export const profileSchema = Joi.object({
  company: Joi.string().required().messages({
    'string.base': 'Invalid type: expected a string',
    'string.empty': 'Company field cannot be empty.',
    'any.required': 'Company field is required.'
  }),
  address: Joi.string().required().messages({
    'string.base': 'Invalid type: expected a string',
    'string.empty': 'Address field cannot be empty.',
    'any.required': 'Address field is required.'
  }),
  phoneNumber: Joi.string().pattern(/^\+\d{1,3}\s[1-9]\d{9,14}$/).required().messages({
    'string.base': 'Invalid type: expected a string',
    'string.pattern.base': 'Invalid Phone Number format. Example: +62 8123456XXXX',
    'string.empty': 'Phone Number field cannot be empty.',
    'any.required': 'Phone Number field is required.'
  }),
  publicUrlImage: Joi.string().required().messages({
    'string.base': 'Invalid type: expected a string',
    'string.empty': 'Public Url Image field cannot be empty.',
    'any.required': 'Public Url Image field is required.'
  }),
  userId: Joi.string().guid({version: ["uuidv4"]}).required().messages({
    'string.base': 'Invalid type: expected a string',
    'string.guid': 'User Id must be a valid UUID v4',
    'string.empty': 'User Id field cannot be empty.',
    'any.required': 'User Id field is required.'
  }),
})
