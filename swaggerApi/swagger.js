const { loginPath } = require("../swaggerApi/loginPath");
const { registerPath } = require("../swaggerApi/registerPath");
const { uploadPath } = require("../swaggerApi/uploadPath");
const { deletePath } = require("../swaggerApi/deletePath");
const { postArticlePath } = require("../swaggerApi/postArticlePath");
const { deleteArticlePath } = require("../swaggerApi/deleteArticlePath");
const { editArticlePath } = require("../swaggerApi/updateArticlePath");
const { articleCommentPath } = require("../swaggerApi/articleCommentPAth");
const { gifCommentPath } = require("../swaggerApi/gifcommentpath");
const { getArtSwagger } = require("../swaggerApi/getArticlebyId");
const { getGifSwagger } = require("../swaggerApi/getGifbyId");
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "User API",
    description: "Documentation for the user routes API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "https://teamwork-aynw.onrender.com",
      description: "dev server",
    },
  ],
  components: {
    securitySchemes: {
      apiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "token",
      },
    },
  },
  paths: {
    ...registerPath,
    ...loginPath,
    ...uploadPath,
    ...deletePath,
    ...postArticlePath,
    ...editArticlePath,
    ...deleteArticlePath,
    ...articleCommentPath,
    ...gifCommentPath,
    ...getArtSwagger,
    ...getGifSwagger,
  },
};

module.exports = swaggerDocument;
