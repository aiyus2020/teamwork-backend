const articleCommentPath = {
  "/api/v1/article_comment/{id}": {
    post: {
      summary: "comment on article",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "comment on article",
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                comment: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Success",
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
                      id: {
                        type: "integer",
                      },
                      message: {
                        type: "string",
                      },
                      createdOn: {
                        type: "string",
                      },
                      articletitle: {
                        type: "string",
                      },
                      article: {
                        type: "string",
                      },
                      comment: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Internal Server Error",
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

module.exports = { articleCommentPath };
