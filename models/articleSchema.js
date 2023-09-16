const Joi = require("joi");

// Validation schema using Joi
const articleSchema = Joi.object({
  title: Joi.string().required(),
  article: Joi.string().required(),
});

module.exports = articleSchema;
