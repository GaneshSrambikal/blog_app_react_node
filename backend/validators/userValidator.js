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
  address: Joi.string().required(),
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
  address: Joi.string().optional(),
  gender: Joi.string().valid('male', 'female', 'other').optional(),
  dob: Joi.date().optional(),
  title: Joi.string().allow('').optional(),
  about: Joi.string().allow('').optional(),
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

const objectIdSchema = Joi.object({
  id: Joi.string().hex().length(24).message('Incorrect user Id'),
});

module.exports = {
  createUserSchema,
  userLoginSchema,
  updateProfileSchema,
  emailSchema,
  passwordResetSchema,
  passwordChangeSchema,
  objectIdSchema,
};
