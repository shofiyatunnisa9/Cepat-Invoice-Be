import Joi from "joi";

export const invoiceSchema = Joi.object({
  noInvoice: Joi.string().pattern(/^INV-gen-\d{8}-\d{3}$/).required().messages({
    'string.base': "Invalid type: expected a string",
    'string.pattern.base': 'Invalid No Invoice format. Example: INV-gen-YYYYMMDD-XXX',
    'string.empty': 'No Invoice field cannot be empty',
    'any.required': 'No Invoice field is required'
  }),
  date: Joi.date().required().messages({
    'date.base': 'Invalid type: expected a valid date format',
    'date.empty': 'Date field cannot be empty',
    'any.required': 'Date field is required'
  }),
  company: Joi.string().required().messages({
    'string.base': 'Invalid type: expected a string',
    'string.empty': 'Company field cannot be empty',
    'any.required': 'Company field is required'
  }),

  address: Joi.string().required().messages({
    'string.base': 'Invalid type: expected a string',
    'string.empty': 'Address field cannot be empty',
    'any.required': 'Address field is required'
  }),
  phoneNumber: Joi.string().pattern(/^\+\d{1,3}\s[1-9]\d{9,14}$/).required().messages({
    'string.base': 'Invalid type: expected a string',
    'string.pattern.base': 'Invalid Phone Number format. Example: +62 8123456XXXX',
    'string.empty': 'Phone Number field cannot be empty',
    'any.required': 'Phone Number field is required'
  }),
  item : Joi.array().items(
    Joi.object({
      product: Joi.string().required().messages({
        'string.base': 'Invalid type: expected a string for product name',
        'string.empty': 'Product field cannot be empty',
        'any.required': 'Product field is required'
      }),
      price: Joi.number().min(0).required().messages({
        'number.base': 'Invalid type: expected a number for price',
        'number.min': 'Price must be a non-negative number',
        'any.required': 'Price field is required'
      }),
      quantity: Joi.number().min(1).required().messages({
        'number.base': 'Invalid type: expected a number for quantity',
        'number.min': 'Quantity must be at least 1',
        'any.required': 'Quantity field is required'
      }),
      total: Joi.number().min(0).required().messages({
        'number.base': 'Invalid type: expected a number for total',
        'number.min': 'Total must be a non-negative number',
        'any.required': 'Total field is required'
      })
    })
  ).min(1).required(),
  subTotal: Joi.number().required().messages({
    'number.base': 'Invalid type: expected a number',
    'number.empty': 'SubTotal field cannot be empty.',
    'any.required': 'SubTotal field is required'
  }),
  discount: Joi.number().required().messages({
    'number.base': 'Invalid type: expected a number',
    'number.empty': 'Discount field cannot be empty.',
    'any.required': 'Discount field is required'
  }),
  total: Joi.number().required().messages({
    'number.base': 'Invalid type: expected a number',
    'number.empty': 'Total field cannot be empty.',
    'any.required': 'Total field is required'
  }),
  publicUrlPdf: Joi.string().required().messages({
    'string.base': 'Invalid type: expected a string',
    'string.empty': 'Public Url Pdf field cannot be empty.',
    'any.required': 'Public Url Pdf field is required'
  }),
  profileId: Joi.number().required().messages({
    'number.base': 'Invalid type: expected a number',
    'number.empty': 'Profile Id field cannot be empty.',
    'any.required': 'Profile Id field is required'
  })
})