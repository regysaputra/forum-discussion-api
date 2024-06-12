const express = require("express");
const app = express();
const threads = require("../../Interfaces/http/api/threads/routes");
const users = require("../../Interfaces/http/api/users/routes");
const authentications = require("../../Interfaces/http/api/authentications/routes");
const comments = require("../../Interfaces/http/api/comments/routes");
const ErrorHandler = require("../middleware/ErrorHandler");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => res.send("Discusion Forum API"));
app.use("/authentications", authentications);
app.use("/threads", threads);
app.use("/users", users);
app.use("/threads", comments);

app.use(ErrorHandler);

module.exports = app;