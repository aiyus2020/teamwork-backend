const client = require("../models/db");
const { getGif, getArts } = require("../queries/getArtGifQuery");
class GetGifArticle {
  async getGif(req, res) {
    try {
      const { gif_id } = req.params;

      const result = await client.query(getGif, [gif_id]);

      if (result.length === 0) {
        // No GIF found with the specified ID
        return res.status(404).json({ message: "GIF not found" });
      }

      res.json({
        status: "success",
        data: {
          gifs_id: result.rows[0].gif_id,
          createdOn: result.rows[0].created_at,
          title: result.rows[0].title,
          imageUrl: result.rows[0].image_url,
          comments: [
            {
              commentId: result.rows[0].comment_id,
              authorId: result.rows[0].id,
              comment: result.rows[0].gif_comment,
            },
            {
              commentId: result.rows[0].comment_id,
              authorId: result.rows[0].id,
              comment: result.rows[0].gif_comment,
            },
          ],
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getArt(req, res) {
    try {
      const { id } = req.params;

      const result = await client.query(getArts, [id]);

      if (result.length === 0) {
        // No GIF found with the specified ID
        return res.status(404).json({ message: "article not found" });
      }

      res.json({
        status: "success",
        data: {
          id: result.rows[0].article_id,
          createdOn: result.rows[0].created_at,
          title: result.rows[0].title,
          article: result.rows[0].article,
          comments: [
            {
              commentId: result.rows[0].comment_id,
              authorId: result.rows[0].user_id,
              comment: result.rows[0].article_comment,
            },
            {
              commentId: result.rows[0].comment_id,
              authorId: result.rows[0].user_id,
              comment: result.rows[0].article_comment,
            },
          ],
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
module.exports = new GetGifArticle();
