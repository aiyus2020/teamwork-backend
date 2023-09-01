const deletePath = {
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
};

module.exports = { deletePath };
