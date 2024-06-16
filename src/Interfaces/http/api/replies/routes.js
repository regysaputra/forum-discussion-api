const express = require("express");
const authenticateToken = require("../../../../Infrastructures/middleware/authenticateToken");
const postReplyHandler = require("./handler");
const router = express.Router();

router.post("/:threadId/comments/:commentId/replies", authenticateToken, postReplyHandler);

module.exports = router;