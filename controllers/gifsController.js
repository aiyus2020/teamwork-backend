const client = require("../models/db");
const {
  newGifsQuery,
  findId,
  deleteGifquery,
} = require("../queries/gifsQuery");
const cloudinary = require("../utlis/cloudinary");

class GifsController {
  async uploadGif(req, res) {
    try {
      const image = req.files.image; // Access the uploaded file using req.files.image
      const title = req.body.title;
      const user_id = req.user;

      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(image.tempFilePath, {
        upload_preset: "gifs",
        secure: true,
      });

      // Get the secure URL of the uploaded image
      const imageUrl = result.secure_url;
      console.log(result);
      // Save the image URL to the database
      const newGifs = await client.query(newGifsQuery, [
        user_id,
        title,
        image.tempFilePath,
        imageUrl,
        result.public_id,
      ]);

      res.json({
        status: "success",
        data: {
          gifs_id: newGifs.rows[0].gifs_id,
          message: "gif image successfully posted",
          createdOn: newGifs.rows[0].created_at,
          title: title,
          imageUrl,
        },
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async deleteGifs(req, res) {
    try {
      const { id } = req.params;
      let upload = await client.query(findId, [id]);
      await cloudinary.uploader.destroy(upload.rows[0].cloud_public_id);
      await client.query(deleteGifquery, [id]);

      // delete image from cloudinary first

      console.log(upload.rows[0].cloud_public_id);
      res.json({
        status: "success",
        data: {
          message: "gifs post successfully deleted",
        },
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new GifsController();
