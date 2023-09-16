const express = require("express");
const cors = require("cors");
const app = express();
const user = require("./routes/userRoutes");
const gifs = require("./routes/gifsRoute");
const comment = require("./routes/commentRoute");
const article = require("./routes/articleRoute");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swaggerApi/swagger");
const fileUpload = require("express-fileupload");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50MB
  })
);

// API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/", gifs);
app.use("/", article);
app.use("/", user);
app.use("/", comment);

const PORT = process.env.PORT || 5000;

// Listening for server
const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = server;
