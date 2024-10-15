// const { check } = require('express-validator');

// // validation rules for creating a user
// const validateCreateUser = [
//   check('username', 'Username is required.').notEmpty(),
//   check('name', 'Name is required.').notEmpty(),
//   check('dob', 'Date of Birth (DOB) is required.').notEmpty(),
//   check('address.street', 'Street is required.').notEmpty(),
//   check('address.city', 'City is required.').notEmpty(),
//   check('address.country', 'Country is required.').notEmpty(),
//   check('address.zip', 'Zip is required.').notEmpty(),
//   check('email', 'Please include a valid email').isEmail,
//   check('password', 'Password must be 6 or more character').isLength({
//     min: 6,
//   }),
// ];

// module.exports = { validateCreateUser };


// JOI
const Joi = require('joi');

// Create Joi validation schema
const createUserSchema = Joi.object({
  username: Joi.string().required(),
  name: Joi.string().required(),
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
});

module.exports = {createUserSchema}
