const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/userController");

//register route
router.post("/api/v1/register", AuthController.register);
router.post("/api/v1/login", AuthController.login);

module.exports = router;
