const getGifSwagger = {
  paths: {
    "/api/v1/gif&comment/{id}": {
      get: {
        summary: "Get a GIF by ID",
        parameters: [
          {
            name: "gif_id",
            in: "path",
            description: "ID of the GIF to retrieve",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        security: [
          {
            apiKeyAuth: { type: "apiKey", in: "header", name: "token" },
          },
        ],
        responses: {
          200: {
            description: "Successful response",
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
                          type: "integer",
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
                        comments: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              commentId: {
                                type: "integer",
                              },
                              authorId: {
                                type: "integer",
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
              },
            },
          },
          404: {
            description: "GIF not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "GIF not found",
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
                      example: "Internal Server Error",
                    },
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

module.exports = { getGifSwagger };
