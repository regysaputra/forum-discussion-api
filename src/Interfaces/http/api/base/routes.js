const express = require("express");
const router = express.Router();
const baseHandler = require("./handler");

router.get("/", baseHandler);

module.exports = router;