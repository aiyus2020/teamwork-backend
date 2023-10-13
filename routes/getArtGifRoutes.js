const express = require("express");
const GetgifArticle = require("../controllers/getArtGifController");
const router = express.Router();
const authenticate = require("../middleware/authmiddleware");
router.get("/api/v1/gif&comment/:id", authenticate, GetgifArticle.getGif);
router.get("/api/v1/article&comment/:id", authenticate, GetgifArticle.getArt);

module.exports = router;
