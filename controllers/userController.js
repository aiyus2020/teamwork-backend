const client = require("../models/db");
const bycrypt = require("bcrypt");
const jwtGenerator = require("../utlis/jwtGenerator");
const { user, userExist, newUser } = require("../queries/userQuery");

class AuthController {
  //register function

  async register(req, res) {
    try {
      const {
        email,
        password,
        firstname,
        lastname,
        gender,
        jobrole,
        department,
        address,
      } = req.body;
      //check/validate if user exist in the databasa
      const myUser = await client.query(user, [email]);

      if (myUser.rows.length !== 0) {
        return res.status(401).send("user already exist, try again");
      }

      //encrypt/hash password

      const saltRound = 10;
      const salt = await bycrypt.genSalt(saltRound);

      const hashedPassword = await bycrypt.hash(password, salt);

      // creating new user
      const newUsers = await client.query(newUser, [
        email,
        hashedPassword,
        firstname,
        lastname,
        gender,
        jobrole,
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
    }
  }

  //login function
  async login(req, res) {
    try {
      const { email, password } = req.body;
      //check if user exist
      const uExist = await client.query(userExist, [email]);
      if (uExist.rows[0].email === 0) {
        return res.status(401).send("password or email incorrect");
      }

      //check if hashed password in the database is same with user password
      const validPassword = await bycrypt.compare(
        password, //user
        uExist.rows[0].password //database
      );
      if (!validPassword) {
        return res.status(401).json("password or email is incorrect");
      }

      const token = jwtGenerator(uExist.rows[0].id);
      res.json({
        status: "success",
        data: {
          message: "user account successfully login",
          token,
          id: uExist.rows[0].id,
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = new AuthController();
