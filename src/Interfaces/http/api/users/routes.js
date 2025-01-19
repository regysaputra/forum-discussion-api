const express = require("express");
const router = express.Router();
const postUserHandler = require("./handler");

router.post("/", postUserHandler);

module.exports = router;