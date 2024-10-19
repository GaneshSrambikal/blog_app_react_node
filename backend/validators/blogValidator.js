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
const deleteCommentSchema = Joi.object({
  commentId: Joi.string().hex().length(24).message('Invalid comment id'),
  blogId: Joi.string().hex().length(24).message('Invalid Blog id'),
});
module.exports = {
  createBlogSchema,
  updateBlogSchema,
  commentSchema,
  deleteCommentSchema,
};
