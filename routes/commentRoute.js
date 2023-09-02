const express = require("express");
const CommentController = require("../controllers/commentController");
const router = express.Router();
const authenticate = require("../middleware/authmiddleware");

router.post(
  "/api/v1/gif_comment/:id",
  authenticate,
  CommentController.gifComment
);
router.post(
  "/api/v1/article_comment/:id",
  authenticate,
  CommentController.articleComment
);

module.exports = router;
