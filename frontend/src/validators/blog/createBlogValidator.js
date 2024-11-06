import Joi from 'joi';

const createBlogSchema = Joi.object({
  title: Joi.string().min(10).required().label('Title').messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 10 characters',
    'any.required': 'Title is required',
  }),
  content: Joi.string().min(10).required().label('Content').messages({
    'string.base': 'Content must be a string',
    'string.empty': 'Content is required',
    'string.min': 'Content must be at least 10 characters',
    'any.required': 'Content is required',
  }),
  category: Joi.string().required().label('Category').messages({
    'string.empty': 'Category is required',
    'any.required': 'Category is required',
  }),
  excerpt: Joi.string().min(10).max(250).required().label('Excerpt').messages({
    'string.base': 'Excerpt must be a string.',
    'string.empty': 'Excerpt is required.',
    'string.min': 'Excerpt must be at least 10 characters.',
    'string.max': 'Excerpt must be max 250 characters.',
    'any.required': 'Excerpt is required.',
  }),
  heroImage: Joi.string().uri().required().label('Image').messages({
    'string.empty': 'Image is required',
    'string.base': 'Image is required',
  }),
  // heroImage: Joi.any().required().label('Image').messages({
  //   'any.required': 'Image is required',
  //   'any.empty': 'Image is required',
  // }),
});

export const validateCreateBlogForm = (formData) => {
  const { error } = createBlogSchema.validate(formData, { abortEarly: false });

  if (!error) return null;

  const errorMessages = {};

  error.details.forEach((detail) => {
    errorMessages[detail.path[0]] = detail.message;
  });

  return errorMessages;
};
