const express = require("express");
const postAuthenticationHandler = require("./handler");
const router = express.Router();

router.post("/", postAuthenticationHandler);

module.exports = router;