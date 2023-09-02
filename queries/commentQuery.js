const client = require("../models/dbMigration");
const gifCommentQuery =
  "INSERT INTO gif_comments (user_id, gif_id, comment) VALUES ($1, $2, $3) RETURNING *";
const articleCommentQuery =
  "INSERT INTO article_comments (user_id, article_id, comment) VALUES ($1, $2, $3) RETURNING *";
//find by id
const findArticleId = "SELECT * FROM articles WHERE id=$1";
module.exports = { gifCommentQuery, articleCommentQuery, findArticleId };
