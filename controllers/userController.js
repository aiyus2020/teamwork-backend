const client = require("../models/db");
const bycrypt = require("bcrypt");
const jwtGenerator = require("../utlis/jwtGenerator");
const { user, userExist, newUser } = require("../queries/userQuery");

class AuthController {
  //register function
  static async register(req, res) {
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
      const myuser = await client.query(user, [email]);

      if (myuser.rows.length !== 0) {
        return res.status(401).send("user already exist, try again");
      }

      //encrypt/hash password

      const saltRound = 10;
      const salt = await bycrypt.genSalt(saltRound);

      const hashedPassword = await bycrypt.hash(password, salt);

      // creating new user
      const Newuser = await client.query(newUser, [
        email,
        hashedPassword,
        firstname,
        lastname,
        gender,
        jobrole,
        department,
        address,
      ]);
      const token = jwtGenerator(Newuser.rows[0].id);
      res.json({
        status: "success",
        data: {
          message: "user account successfully created",
          token,

          id: newUser.rows[0].id,
        },
      });
    } catch (error) {
      console.error({ status: "error", errro: error });
    }
  }

  //login function
  static async login(req, res) {
    try {
      const { email, password, id } = req.body;
      //check if user exist
      const Userexist = await client.query(userExist, [email]);
      if (Userexist.rows[0].email === 0) {
        return res.status(401).send("password or email incorrect");
      }

      //check if hashed password in the database is same with user password
      const validPassword = await bycrypt.compare(
        password, //user
        Userexist.rows[0].password //database
      );
      if (!validPassword) {
        return res.status(401).json("password or email is incorrect");
      }

      const token = jwtGenerator(Userexist.rows[0].id);
      res.json({
        status: "success",
        data: {
          message: "user account successfully login",
          token,
          id: Userexist.rows[0].id,
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  }
}
module.exports = AuthController;
