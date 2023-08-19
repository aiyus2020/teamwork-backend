const deleteArticlePath = {
  "/api/v1/delete_article/:{id}": {
    delete: {
      summary: "delete Article",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "the id of the article to delete",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "success",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                  },
                  data: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "bad request",
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
module.exports = { deleteArticlePath };
