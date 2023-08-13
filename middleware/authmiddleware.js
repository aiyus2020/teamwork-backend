require("dotenv").config();
const jwt = require("jsonwebtoken");
const client = require("../models/db");
const { tokenQuery } = require("../queries/userQuery");
module.exports = async function authenticate(req, res, next) {
  try {
    const jwtToken = req.header("token");
    //check for the token
    if (!jwtToken) {
      return res.status(403).json("not authorised");
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret); //save the token to the payload variable
    const userId = payload.user; //extract the user from the payload i.e the id
    const { rows } = await client.query(tokenQuery, [userId]); // save the user info from the db into rows variable
    //check for user
    if (rows.length === 0) {
      return res.status(404).json("User not found");
    }

    // Attach the fetched user data to the req.user property
    req.user = rows[0].id;

    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("not authorised");
  }
};
