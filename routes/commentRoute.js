const express = require("express");
const CommentController = require("../controllers/commentController");
const router = express.Router();
const authenticate = require("../middleware/authmiddleware");
const validateMiddleware = require("../middleware/userValidationMiddleware");
const gifCommentSchema = require("../models/gifCommentSchema");
const articleCommentSchema = require("../models/articleCommentSchema");
router.post(
  "/api/v1/gif_comment/:id",
  authenticate,
  validateMiddleware(gifCommentSchema),
  CommentController.gifComment
);
router.post(
  "/api/v1/article_comment/:id",
  authenticate,
  validateMiddleware(articleCommentSchema),
  CommentController.articleComment
);

module.exports = router;
