const express = require("express");
const router = express.Router();
const client = require("../models/db");
const bycrypt = require("bcrypt");
const jwtGenerator = require("../utlis/jwtGenerator");

//register route
router.post("/api/v1/register", async (req, res) => {
  try {
    const {
      id,
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
    const user = await client.query("SELECT * FROM register WHERE email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send("user already exist");
    }
    //encrypt/hash password

    const saltRound = 10;
    const salt = await bycrypt.genSalt(saltRound);

    const hashedPassword = await bycrypt.hash(password, salt);

    // creating new user
    const newUser = await client.query(
      "INSERT INTO register (email, password, firstname, lastname, gender, jobrole, department,address) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [
        email,
        hashedPassword,
        firstname,
        lastname,
        gender,
        jobrole,
        department,
        address,
      ]
    );
    const token = jwtGenerator(newUser.rows[0].id);
    res.json({
      status: "success",
      data: {
        message: "user account successfully created",
        token,
        id,
      },
    });
  } catch (error) {
    console.error({ status: "error", errro: error });
  }
});

module.exports = router;
