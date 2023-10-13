const client = require("../models/db");

const getGif =
  "SELECT g.gifs_id AS gif_id, c.gif_id AS comment_id, u.id, g.title, g.image_url,  c.comment AS gif_comment, g.created_at FROM upload g LEFT JOIN gif_comments c ON g.gifs_id = c.gif_id LEFT JOIN users u on g.gifs_id = u.id WHERE g.gifs_id = $1";

const getArts =
  "SELECT a.id AS article_id,  u.id AS user_id, c.id AS comment_id, a.title, a.article,  c.comment AS article_comment, a.created_at FROM  articles a LEFT JOIN article_comments c ON a.id = c.article_id LEFT JOIN users u on a.id = a.id WHERE a.id = $1";

module.exports = { getGif, getArts };
