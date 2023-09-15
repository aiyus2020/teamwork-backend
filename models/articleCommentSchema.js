const Joi = require("joi");

// Validation schema using Joi
const articleCommentSchema = Joi.object({
  comment: Joi.string().required(),
});

module.exports = articleCommentSchema;
