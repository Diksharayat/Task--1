const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Title",
      version: "1.0.0",
      description: "API Documentation",
    },
    servers: [
      {
        url: "http://localhost:3002",
      },
    ],
  },
  apis: ["./routes/users/**/*.js"],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
