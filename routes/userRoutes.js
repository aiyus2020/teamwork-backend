const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/userController");
const validateMiddleware = require("../middleware/userValidationMiddleware");
const userSchema = require("../models/userSchema");
//register route
router.post(
  "/api/v1/register",
  validateMiddleware(userSchema),
  AuthController.register
);
router.post("/api/v1/login", AuthController.login);

module.exports = router;
