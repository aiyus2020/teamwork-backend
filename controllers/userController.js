const Joi = require("joi");
const client = require("../models/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utlis/jwtGenerator");
const {
  userQuery,
  newUserQuery,
  userExistQuery,
} = require("../queries/userQuery");

class AuthController {
  // Register function
  async register(req, res) {
    try {
      // Validation schema using Joi
      const schema = Joi.object({
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
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Extract data from the request body
      const {
        email,
        password,
        firstName,
        lastName,
        gender,
        jobRole,
        department,
        address,
      } = req.body;

      // Check if user already exists
      const myUser = await client.query(userQuery, [email]);
      if (myUser.rows.length !== 0) {
        return res
          .status(401)
          .json({ error: "User already exists, try again" });
      }

      // Hash the password
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user in the database
      const newUsers = await client.query(newUserQuery, [
        email,
        hashedPassword,
        firstName,
        lastName,
        gender,
        jobRole,
        department,
        address,
      ]);

      // Generate a JWT token for the new user
      const token = jwtGenerator(newUsers.rows[0].id);
      res.json({
        status: "success",
        data: {
          message: "User account successfully created",
          token,
          id: newUsers.rows[0].id,
        },
      });
    } catch {
      return res.status(500).json("Internal Server Error");
    }
  }

  // Login function
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const userExist = await client.query(userExistQuery, [email]);
      if (userExist.rows[0].email === 0) {
        return res.status(401).send("Password or email incorrect");
      }

      // Check if hashed password in the database matches user password
      const validPassword = await bcrypt.compare(
        password, // User's input
        userExist.rows[0].password // Hashed password from the database
      );

      if (!validPassword) {
        return res.status(401).json("Password or email is incorrect");
      }

      // Generate a JWT token for the existing user
      const token = jwtGenerator(userExist.rows[0].id);
      res.json({
        status: "success",
        data: {
          message: "User account successfully login",
          token,
          id: userExist.rows[0].id,
        },
      });
    } catch {
      return res.status(500).json("Internal Server Error");
    }
  }
}

module.exports = new AuthController();
