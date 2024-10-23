import Joi from 'joi';

const LoginSchema = Joi.object({
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
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters',
    })
    .label('Password'),
});

export const validateLoginForm = (formData) => {
  const { error } = LoginSchema.validate(formData, { abortEarly: false });

  if (!error) return null;
  console.log(error);
  const errorMessages = {};
  if (error.details)
    error.details.forEach((detail) => {
      errorMessages[detail.path[0]] = detail.message;
    });
  return errorMessages;
};

export const ForgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ['com', 'net', 'org'] } })
    .required()
    .label('Email'),
});
