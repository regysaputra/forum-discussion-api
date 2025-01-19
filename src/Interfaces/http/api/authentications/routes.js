const express = require("express");
const { postAuthenticationHandler, putAuthenticationHandler, deleteAuthenticationHandler } = require("./handler");
const router = express.Router();

router.post("/", postAuthenticationHandler);
router.put("/", putAuthenticationHandler);
router.delete("/", deleteAuthenticationHandler);

module.exports = router;