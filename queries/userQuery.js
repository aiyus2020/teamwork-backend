const client = require("../models/db");

//check/validate if user exist in the databasa
const userQuery = "SELECT * FROM users WHERE email = $1";
//creating new user
const tokenQuery = "SELECT * FROM users WHERE id = $1";
const newUserQuery =
  "INSERT INTO users ( email,password, first_name,last_name,gender,job_role,department,address) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
//check if user exist for login
const userExistQuery = "SELECT * FROM users WHERE email=$1";
//delete user query
const deleteUserQuery = "DELETE FROM users WHERE id=$1";

module.exports = {
  tokenQuery,
  userQuery,
  newUserQuery,
  userExistQuery,
  deleteUserQuery,
};
