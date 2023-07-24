const client = require("../models/db");
const newGifsQuery = require("../queries/gifsQuery");
const cloudinary = require("../utlis/cloudinary");

class GifsController {
  async uploadGif(req, res) {
    try {
      const image = req.files.image; // Access the uploaded file using req.files.image
      const title = req.body.title;

      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(image.tempFilePath, {
        upload_preset: "gifs",
      });

      // Get the secure URL of the uploaded image
      const imageUrl = result.secure_url;

      // Save the image URL to the database
      const newGifs = await client.query(newGifsQuery, [
        title,
        image.tempFilePath,
        imageUrl,
      ]);

      res.json({
        status: "success",
        data: {
          gifs_id: newGifs.rows[0].gifs_id,
          message: "gif image successfully posted",
          createdOn: new Date().toString(),
          title: title,
          imageUrl,
        },
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new GifsController();
