const express = require('express');
const authenticateToken = require("../../../../Infrastructures/middleware/authenticateToken");
const postCommentHandler = require("./handler");
const router = express.Router();

router.post("/:threadId/comments", authenticateToken, postCommentHandler);

module.exports = router;