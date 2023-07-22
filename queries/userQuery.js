const client = require("../utlis/dbMigration");

//check/validate if user exist in the databasa
const userQuery = "SELECT * FROM register WHERE email = $1";
//creating new user

const newUserQuery =
  "INSERT INTO register ( email,password, first_name,last_name,gender,jobrole,department,address) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
//check if user exist for login
const userExistQuery = "SELECT * FROM register WHERE email=$1";
//delete user query
const deleteUserQuery = "DELETE FROM register WHERE id=$1";

module.exports = { userQuery, newUserQuery, userExistQuery, deleteUserQuery };
