const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const fs = require('fs');

// const options = {
//   swaggerDefinition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Forum API",
//       version: "1.0.0",
//       description: "RESTful API for discussion forum app"
//     },
//     servers: [
//       {
//         url: `htttp://${process.env.HOST}:${process.env.PORT}`
//       }
//     ]
//   },
//   apis: ["./src/Interfaces/http/api/*/routes.js"]
// };

const swaggerFile = `${process.cwd()}/swagger/index.json`;
const swaggerData = fs.readFileSync(swaggerFile, "utf-8");
const swaggerJSON = JSON.parse(swaggerData);
const styling = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui.min.css";

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSON, { customCssUrl: styling }));
};