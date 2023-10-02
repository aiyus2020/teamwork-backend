const postArticlePath = {
  "/api/v1/post_article": {
    post: {
      security: [
        {
          apiKeyAuth: { type: "apiKey", in: "header", name: "token" },
        },
      ],
      summary: "post articles",
      requestBody: {
        content: {
          "aplication/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                },
                article: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "success",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                  articleId: {
                    type: "interger",
                  },
                  title: {
                    type: "string",
                  },
                  createdOn: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
module.exports = { postArticlePath };
