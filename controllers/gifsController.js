const client = require("../models/dbMigration");
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
      const userId = req.user;

      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(image.tempFilePath, {
        upload_preset: "pictures",
        secure: true,
      });

      // Get the secure URL and the publicID of the uploaded image
      const imageUrl = result.secure_url;
      const publicId = result.public_id;
      // Save the image URL to the database
      const newGifs = await client.query(newGifsQuery, [
        userId,
        title,
        imageUrl,
        publicId,
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
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async deleteGifs(req, res) {
    try {
      const { id } = req.params;
      let upload = await client.query(findId, [id]);

      // delete image from cloudinary first
      await cloudinary.uploader.destroy(upload.rows[0].cloud_public_id);
      await client.query(deleteGifquery, [id]);

      res.json({
        status: "success",
        data: {
          message: "gifs post successfully deleted",
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new GifsController();
