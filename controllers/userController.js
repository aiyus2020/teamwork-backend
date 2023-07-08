const client = require("../models/db");
const bycrypt = require("bcrypt");
const jwtGenerator = require("../utlis/jwtGenerator");
//register function
async function register(req, res) {
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
      return res.status(401).send("user already exist, try again");
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

        id: newUser.rows[0].id,
      },
    });
  } catch (error) {
    console.error({ status: "error", errro: error });
  }
}

//login function
async function login(req, res) {
  try {
    const { email, password, id } = req.body;
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
        id: user.rows[0].id,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
}
module.exports = { register, login };
