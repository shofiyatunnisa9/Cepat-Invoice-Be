import Joi from "joi";

export const authSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Invalid type: expected a string',
    'string.email': 'Invalid email format',
    'string.empty': 'Email field cannot be empty', 
    'any.required': 'Email field is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'Invalid type: expected a string',
    'string.min': 'Password length must be at least 6 characters',
    'string.empty': 'Password field cannot be empty', 
    'any.required': 'Password field is required'
  })
})