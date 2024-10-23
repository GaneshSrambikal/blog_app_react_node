import Joi from 'joi';
// Joi schema for validation
const registerSchema = Joi.object({
  name: Joi.string().min(3).required().label('Name').messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters',
    'any.required': 'Name is required',
  }),
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.base': 'Username must be a string',
      'string.empty': 'Username is required',
      'string.min': 'Username must be at least 3 characters',
      'any.required': 'Username is required',
    })
    .label('Username'),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Email must be valid',
      'string.empty': 'Email is required',
      'any.required': 'Email is required',
    })
    .label('Email'),
  password: Joi.string()
    .min(6)
    .required()
    .custom((value, helpers) => {
      const email = helpers.state.ancestors[0].email;
      const regex = new RegExp(email, 'i');
      if (regex.test(value)) {
        return helpers.message('Password cannot contain the email address');
      }
      return value;
    })
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters',
    })
    .label('Password'),
  address: Joi.string().required().label('Address').messages({
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
});

export const validateRegisterForm = (formData) => {
  const { error } = registerSchema.validate(formData, { abortEarly: false });

  if (!error) return null;

  const errorMessages = {};
  //   loop through each errors
  error.details.forEach((detail) => {
    errorMessages[detail.path[0]] = detail.message;
  });

  return errorMessages;
};
