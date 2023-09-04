const express = require("express");
const PostController = require("../controllers/postArticleController");
const router = express.Router();
const authenticate = require("../middleware/authmiddleware");

router.post("/api/v1/post_article", authenticate, PostController.postArticle);
router.patch(
  "/api/v1/update_article/:id",
  authenticate,
  PostController.editArticle
);
router.delete(
  "/api/v1/delete_article/:id",
  authenticate,
  PostController.deleteArticle
);

module.exports = router;