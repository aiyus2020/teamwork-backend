const gifCommentPath = {
  "/api/v1/gif_comment/{id}": {
    post: {
      summary: "comment on gif",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "comment on gif",
          schema: {
            type: "string",
          },
        },
      ],
      security: [
        {
          apiKeyAuth: { type: "apiKey", in: "header", name: "token" },
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
                      giftitle: {
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

module.exports = { gifCommentPath };
