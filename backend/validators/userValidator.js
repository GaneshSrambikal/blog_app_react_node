// JOI
const Joi = require('joi');

// Create Joi User validation schema
const createUserSchema = Joi.object({
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
  isAdmin: Joi.boolean().optional(),
});

// login validation
const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Define the Joi schema for updating user profile
const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  email: Joi.string().email().optional(),
  address: Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
    zip: Joi.string().optional(),
  }).optional(),
  gender: Joi.string().valid('male', 'female', 'other').optional(),
  dob: Joi.date().optional(),
});

// email validation for forgot password
const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

// password validation for reset password
const passwordResetSchema = Joi.object({
  password: Joi.string().min(6).max(50).required(),
});
const passwordChangeSchema = Joi.object({
  currentPassword: Joi.string().required(),
  password: Joi.string().min(6).max(50).required(),
});

module.exports = {
  createUserSchema,
  userLoginSchema,
  updateProfileSchema,
  emailSchema,
  passwordResetSchema,
  passwordChangeSchema,
};
