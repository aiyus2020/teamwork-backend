const Joi = require("joi");
const userSchema = require("../models/userSchema");

// Validate the incoming request body against the schema
const validateMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = userSchema.validate(req.body);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      next();
    }
  };
};

module.exports = validateMiddleware;
