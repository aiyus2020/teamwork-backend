require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function authenticate(req, res, next) {
  try {
    const jwtToken = req.header("token");
    //check for the token
    if (!jwtToken) {
      return res.status(403).json("not authorised");
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("not authorised");
  }
};
