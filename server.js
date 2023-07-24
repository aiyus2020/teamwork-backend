const express = require("express");
const cors = require("cors");
const app = express();
const user = require("./routes/userRoutes");
const gifs = require("./routes/gifsRoute");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swaggerApi/swagger");
const fileUpload = require("express-fileupload");
//middleware
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use("/", gifs);
app.use("/", user);

const PORT = process.env.PORT || 5000;
//listening for server
const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = server;
