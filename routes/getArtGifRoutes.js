const express = require("express");
const GetGifArticle = require("../controllers/getArtGifController");
const router = express.Router();
const authenticate = require("../middleware/authmiddleware");
router.get("/api/v1/gif&comment/:id", authenticate, GetGifArticle.getGif);
router.get("/api/v1/article&comment/:id", authenticate, GetGifArticle.getArt);

module.exports = router;
