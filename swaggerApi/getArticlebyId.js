const getArtSwagger = {
  paths: {
    "/api/v1/article&comment/{id}": {
      get: {
        summary: "Get an article by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of the article to retrieve",
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
                      example: "success",
                    },
                    data: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                        },
                        createdOn: {
                          type: "string",
                        },
                        title: {
                          type: "string",
                        },
                        article: {
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
            description: "Article not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Article not found",
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

module.exports = { getArtSwagger };
