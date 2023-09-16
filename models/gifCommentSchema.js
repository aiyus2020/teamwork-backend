const Joi = require("joi");

// Validation schema using Joi
const gifCommentSchema = Joi.object({
  comment: Joi.string().required(),
});

module.exports = gifCommentSchema;
