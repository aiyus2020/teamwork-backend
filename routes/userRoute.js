const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userController");

//register route
router.post("/api/v1/register", register);
router.post("/api/v1/login", login);

module.exports = router;
