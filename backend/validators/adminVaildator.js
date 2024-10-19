const Joi = require('joi');

// Create Joi Admin validation schema
const createAdminSchema = Joi.object({
  username: Joi.string().min(2).max(50).required(),
  name: Joi.string().min(2).max(30).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  dob: Joi.date().required(),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    zip: Joi.string().required(),
  }).required(),
  isAdmin: Joi.boolean().required(),
});

const adminLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { createAdminSchema, adminLoginSchema };