const Joi = require('joi');

const createBlogSchema = Joi.object({
  title: Joi.string().min(10).required(),
  content: Joi.string().min(10).required(),
});
const updateBlogSchema = Joi.object({
  title: Joi.string().min(10).required(),
  content: Joi.string().min(10).required(),
});

const commentSchema = Joi.object({
  comment: Joi.string().min(1).max(80).required(),
});
module.exports = { createBlogSchema, updateBlogSchema, commentSchema };
