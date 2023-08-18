const client = require("../models/db");
const {
  newArticle,
  updateArticleQuery,
  deleteArticleQuery,
} = require("../queries/articleQuery");
class PostController {
  async postArticle(req, res) {
    try {
      const { title, article } = req.body;
      const userId = req.user;
      const myArticle = await client.query(newArticle, [
        userId,
        title,
        article,
      ]);
      res.json({
        status: "success",
        data: {
          message: "article successfully posted",
          articleId: myArticle.rows[0].id,
          article,
          title,
          createdOn: myArticle.rows[0].created_at,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async editArticle(req, res) {
    try {
      const userId = req.user;
      const { id } = req.params;
      const { title, article } = req.body;

      const update = await client.query(updateArticleQuery, [
        title,
        article,
        id,
        userId,
      ]);
      if (update.rows.length == 0) {
        return res.status(400).json("article not found");
      }

      res.json({
        status: "success",
        data: {
          message: "Article successfully updated",
          title,
          article,
          updatedAt: update.rows[0].updated_at,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async deleteArticle(req, res) {
    try {
      const userId = req.user;
      const { id } = req.params;
      const deleteArt = await client.query(deleteArticleQuery, [id]);
      if (deleteArt.rows.length == 0) {
        return res.status(400).json({ error: "article not found" });
      }

      res.json({
        status: "success",
        data: {
          message: "article deleted successfully",
        },
      });
    } catch (error) {
      res.status(500).json({ error: "internal server Error" });
    }
  }
}

module.exports = new PostController();
