const Joi = require("joi");

// Validation schema using Joi
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  gender: Joi.string().required(),
  jobRole: Joi.string().required(),
  department: Joi.string().required(),
  address: Joi.string().required(),
});

module.exports = userSchema;
