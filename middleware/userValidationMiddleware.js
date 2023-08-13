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

// Validate the incoming request body against the schema
const validateMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      next();
    }
  };
};

module.exports = { userSchema, validateMiddleware };
