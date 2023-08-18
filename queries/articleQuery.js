const client = require("../models/dbMigration");
const newArticle =
  "INSERT INTO articles (user_id,title,article) VALUES ($1,$2,$3) RETURNING *";
const updateArticleQuery =
  "UPDATE articles SET title = $1, article = $2, updated_at = NOW() WHERE id = $3 AND user_id = $4 RETURNING *";
const deleteArticleQuery = "DELETE  FROM articles WHERE id=$1";
module.exports = { newArticle, updateArticleQuery, deleteArticleQuery };
