const uploadPath = {
  "/api/v1/gifs_upload": {
    post: {
      security: [
        {
          apiKeyAuth: { type: "apiKey", in: "header", name: "token" },
        },
      ],
      summary: "Upload a new GIF",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                image: {
                  type: "string",
                  format: "binary",
                },
                title: {
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
                      gifs_id: {
                        type: "string",
                      },
                      message: {
                        type: "string",
                      },
                      createdOn: {
                        type: "string",
                      },
                      title: {
                        type: "string",
                      },
                      imageUrl: {
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
          description: "Bad Request",
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

module.exports = { uploadPath };
