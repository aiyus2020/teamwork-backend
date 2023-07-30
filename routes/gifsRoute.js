const express = require("express");
const router = express.Router();
const GifsController = require("../controllers/gifsController");
const authenticate = require("../middleware/authmiddleware");
//gifsupload route

router.post("/api/v1/gifs_upload", authenticate, GifsController.uploadGif);
router.delete(
  "/api/v1/deletegifs/:id",

  authenticate,
  GifsController.deleteGifs
);

module.exports = router;
