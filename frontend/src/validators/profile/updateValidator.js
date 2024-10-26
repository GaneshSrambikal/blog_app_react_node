import Joi from 'joi';
// Define the Joi schema for updating user profile
const updateProfileSchema = Joi.object({
  
  name: Joi.string().min(3).required().label('Name').messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters',
    'any.required': 'Name is required',
  }),
  address: Joi.string().min(3).required().label('Address').messages({
    'string.base': 'address must be a string',
    'string.empty': 'address is required',
    'string.min': 'address must be at least 3 characters',
    'any.required': 'address is required',
  }),
  gender: Joi.string().required().label('Gender').messages({
    'string.base': 'Gender must be a string',
    'string.empty': 'Gender is required',
    'any.required': 'Gender is required',
  }),
  dob: Joi.date().required().label('Date of Birth').messages({
    'string.empty': 'Date of Birth is required',
    'any.required': 'Date of Birth is required',
  }),
  title: Joi.string().allow('').optional().label('Title'),
  about: Joi.string().allow('').optional().label('About'),
});

export const validateUpdateForm = (formData) => {
  const { error } = updateProfileSchema.validate(formData, {
    abortEarly: false,
  });

  if (!error) return null;

  const errorMessages = {};

  error.details.forEach((detail) => {
    errorMessages[detail.path[0]] = detail.message;
  });
  return errorMessages;
};
