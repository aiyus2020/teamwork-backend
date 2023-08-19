const { loginPath } = require("../swaggerApi/loginPath");
const { registerPath } = require("../swaggerApi/registerPath");
const { uploadPath } = require("../swaggerApi/uploadPath");
const { deletePath } = require("../swaggerApi/deletePath");
const { postArticlePath } = require("../swaggerApi/postArticlePath");
const { deleteArticlePath } = require("../swaggerApi/deleteArticlePath");
const { editArticlePath } = require("../swaggerApi/updateArticlePath");
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "User API",
    description: "Documentation for the user routes API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "dev server",
    },
  ],
  paths: {
    ...registerPath,
    ...loginPath,
    ...uploadPath,
    ...deletePath,
    ...postArticlePath,
    ...editArticlePath,
    ...deleteArticlePath,
  },
};

module.exports = swaggerDocument;
