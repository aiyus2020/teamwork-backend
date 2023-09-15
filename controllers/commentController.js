const client = require("../models/db");
const { gifCommentQuery } = require("../queries/commentQuery");

const { articleCommentQuery } = require("../queries/commentQuery");
class CommentController {
  //gif comment function
  async gifComment(req, res) {
    try {
      const userId = req.user.id; //get/access the user id
      const { id } = req.params; //get/access the gif id
      const { comment } = req.body; // get/access the comment

      //query to insert into the gif comment table
      const myGifComment = await client.query(gifCommentQuery, [
        userId,
        id,
        comment,
      ]);
      if (myGifComment.rows.comment.le == 0) {
        return res;
      }
      res.json({
        status: "success",
        data: {
          message: "comment successfully created",
          createdOn: myGifComment.rows[0].created_at,

          comment,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async articleComment(req, res) {
    try {
      const userId = req.user.id; //get/access the user id
      const { id } = req.params; //get/access the gif id
      const { comment } = req.body; // get/access the comment

      //query to insert into the gif comment table
      const myArticleComment = await client.query(articleCommentQuery, [
        userId,
        id,
        comment,
      ]);

      res.json({
        status: "success",
        data: {
          id: myArticleComment.rows[0].id,
          message: "comment successfully created",
          createdOn: myArticleComment.rows[0].created_at,
          comment,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new CommentController();
