const express = require("express");
const PostController = require("../controllers/postArticleController");
const router = express.Router();
const authenticate = require("../middleware/authmiddleware");
const validateMiddleware = require("../middleware/userValidationMiddleware");
const articleSchema = require("../models/articleSchema");
router.post(
  "/api/v1/post_article",
  authenticate,
  validateMiddleware(articleSchema),
  PostController.postArticle
);
router.patch(
  "/api/v1/update_article/:id",
  authenticate,
  validateMiddleware(articleSchema),
  PostController.editArticle
);
router.delete(
  "/api/v1/delete_article/:id",
  authenticate,
  PostController.deleteArticle
);

module.exports = router;
