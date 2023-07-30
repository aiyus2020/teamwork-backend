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
    "/api/v1/login": {
      post: {
        summary: "User login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                  },
                  password: {
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
                        message: {
                          type: "string",
                        },
                        token: {
                          type: "string",
                        },
                        id: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/register": {
      post: {
        summary: "Create a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                  firstName: {
                    type: "string",
                  },
                  lastName: {
                    type: "string",
                  },
                  gender: {
                    type: "string",
                  },
                  jobRole: {
                    type: "string",
                  },
                  department: {
                    type: "string",
                  },
                  address: {
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
                        message: {
                          type: "string",
                        },
                        token: {
                          type: "string",
                        },
                        id: {
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
    "/api/v1/gifs_upload": {
      post: {
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
    "/api/v1/deletegifs/{id}": {
      delete: {
        summary: "Delete a GIF by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            description: "The ID of the GIF to delete",
            schema: {
              type: "string",
            },
          },
        ],
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
  },
};

module.exports = swaggerDocument;
