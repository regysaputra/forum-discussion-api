const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Forum API",
      version: "1.0.0",
      description: "RESTful API for discussion forum app"
    },
    servers: [
      {
        url: `htttp://${process.env.HOST}:${process.env.PORT}`
      }
    ]
  },
  apis: ["./src/Interfaces/http/api/*/routes.js"]
};

const specs = swaggerJSDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};