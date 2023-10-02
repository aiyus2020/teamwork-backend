const loginPath = {
  "/api/v1/login": {
    post: {
      security: [
        {
          apiKeyAuth: { type: "apiKey", in: "header", name: "token" },
        },
      ],
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
};

module.exports = { loginPath };
