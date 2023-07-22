const client = require("../utlis/dbMigration");
const bycrypt = require("bcrypt");
const jwtGenerator = require("../utlis/jwtGenerator");
const {
  userQuery,
  newUserQuery,
  userExistQuery,
} = require("../queries/userQuery");
const validator = require("validator");

class AuthController {
  //register function

  async register(req, res) {
    try {
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
      //check/validate if user exist in the databasa
      const myUser = await client.query(userQuery, [email]);

      if (myUser.rows.length !== 0) {
        return res.status(401).send("user already exist, try again");
      }

      //encrypt/hash password

      const saltRound = 10;
      const salt = await bycrypt.genSalt(saltRound);

      const hashedPassWord = await bycrypt.hash(password, salt);

      // creating new user
      const newUsers = await client.query(newUserQuery, [
        email,
        hashedPassWord,
        firstName,
        lastName,
        gender,
        jobRole,
        department,
        address,
      ]);
      const token = jwtGenerator(newUsers.rows[0].id);
      res.json({
        status: "success",
        data: {
          message: "user account successfully created",
          token,

          id: newUsers.rows[0].id,
        },
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json("Internal Server Error");
    }
  }

  //login function
  async login(req, res) {
    try {
      const { email, password } = req.body;
      // Validate the email format
      if (!validator.isEmail(email)) {
        return res.status(400).json("Invalid email format");
      }

      //check if user exist
      const userExist = await client.query(userExistQuery, [email]);
      if (userExist.rows[0].email === 0) {
        return res.status(401).send("password or email incorrect");
      }

      //check if hashed password in the database is same with user password
      const validPassword = await bycrypt.compare(
        password, //user
        userExist.rows[0].password //database
      );

      if (!validPassword) {
        return res.status(401).json("password or email is incorrect");
      }

      const token = jwtGenerator(userExist.rows[0].id);
      res.json({
        status: "success",
        data: {
          message: "user account successfully login",
          token,
          id: userExist.rows[0].id,
        },
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json("Internal Server Error");
    }
  }
  async postgifs(req, res) {
    try {
    } catch (error) {
      console.error(error.message);
      return res.status(500).json("Internal Server Error");
    }
  }
}

module.exports = new AuthController();
