const Joi = require('joi');

const createBlogSchema = Joi.object({
  title: Joi.string().min(10).required(),
  content: Joi.string().min(10).required(),
});
const updateBlogSchema = Joi.object({
  title: Joi.string().min(10).required(),
  content: Joi.string().min(10).required(),
});

module.exports = { createBlogSchema, updateBlogSchema };
