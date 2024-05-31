const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Express on vercel"));

module.exports = app;