const client = require("../models/db");

//check/validate if user exist in the databasa
const userQuery = "SELECT * FROM register WHERE email = $1";
//creating new user

const newUserQuery =
  "INSERT INTO register ( email,password, firstname,lastname,gender,jobrole,department,address) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
//check if user exist for login
const userExistQuery = "SELECT * FROM register WHERE email=$1";
module.exports = { userQuery, newUserQuery, userExistQuery };