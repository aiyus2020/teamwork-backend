const client = require("../models/db");
//post new gifs

const newGifsQuery =
  "INSERT INTO upload (title, image, image_url) VALUES ($1, $2,$3) RETURNING *";

module.exports = newGifsQuery;
