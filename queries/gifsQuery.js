const client = require("../models/db");
//post new gifs

const newGifsQuery =
  "INSERT INTO upload (user_id,title, image_url,cloud_public_id) VALUES ($1, $2,$3,$4) RETURNING *";
//delete gifs

//find by id
const findId = "SELECT * FROM upload WHERE gifs_id=$1";
//delete
const deleteGifquery = "DELETE FROM upload WHERE gifs_id = $1 ";
module.exports = { newGifsQuery, findId, deleteGifquery };
