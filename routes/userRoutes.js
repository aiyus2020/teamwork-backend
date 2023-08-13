const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/userController");
const {
  userSchema,
  validateMiddleware,
} = require("../middleware/userValidationMiddleware");

//register route
router.post(
  "/api/v1/register",
  validateMiddleware(userSchema),
  AuthController.register
);
router.post("/api/v1/login", AuthController.login);

module.exports = router;
