import Joi from 'joi';

export const LoginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: ['com', 'net', 'org'] } }).required().label('Email'),
  password: Joi.string().required().label('Password'),
});
