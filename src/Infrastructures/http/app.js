const express = require("express");
const app = express();
const threads = require("../../Interfaces/http/api/threads/routes");

app.use(express.json());

app.get("/", (req, res) => res.send("Discusion Forum API"));
app.use("/threads", threads);

module.exports = app;