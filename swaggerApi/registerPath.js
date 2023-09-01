const registerPath = {
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
};

module.exports = { registerPath };
