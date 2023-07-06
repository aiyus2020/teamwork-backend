const express = require("express");
const router = express.Router();
const client = require("../models/db");
const bycrypt = require("bcrypt");
const jwtGenerator = require("../utlis/jwtGenerator");

//login route
router.post("/api/v1/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user exist
    const user = await client.query("SELECT * FROM register WHERE email=$1", [
      email,
    ]);
    if (user.rows[0].email === 0) {
      return res.status(401).send("password or email incorrect");
    }

    //check if hashed password in the database is same with user password
    const validPassword = await bycrypt.compare(
      password, //user
      user.rows[0].password //database
    );
    if (!validPassword) {
      return res.status(401).json("password or email is incorrect");
    }

    const token = jwtGenerator(user.rows[0].id);
    res.json({
      status: "success",
      data: {
        message: "user account successfully login",
        token,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
});
module.exports = router;
