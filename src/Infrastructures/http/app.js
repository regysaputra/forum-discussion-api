const express = require("express");
const app = express();
const base = require("../../Interfaces/http/api/base/routes");
const threads = require("../../Interfaces/http/api/threads/routes");
const users = require("../../Interfaces/http/api/users/routes");
const authentications = require("../../Interfaces/http/api/authentications/routes");
const comments = require("../../Interfaces/http/api/comments/routes");
const replies = require("../../Interfaces/http/api/replies/routes");
const ErrorHandler = require("../middleware/ErrorHandler");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/", base);
app.use("/users", users);
app.use("/authentications", authentications);
app.use("/threads", threads);
app.use("/threads", comments);
app.use("/threads", replies);

app.use(ErrorHandler);

module.exports = app;