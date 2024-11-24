import Joi from 'joi';

const geminiSchema = Joi.object({
  title: Joi.string().min(10).required().label('Title').messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 10 characters',
    'any.required': 'Title is required',
  }),
  category: Joi.string().required().label('Category').messages({
    'string.empty': 'Category is required',
    'any.required': 'Category is required',
  }),
});

export const validateGeminiInput = (title, category) => {
  const { error } = geminiSchema.validate(
    { title, category },
    { abortEarly: false }
  );

  if (!error) return null;

  const errorMessages = {};

  error.details.forEach((detail) => {
    errorMessages[detail.path[0]] = detail.message;
  });

  return errorMessages;
};
