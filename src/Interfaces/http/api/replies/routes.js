const express = require("express");
const authenticateToken = require("../../../../Infrastructures/middleware/authenticateToken");
const { postReplyHandler, deleteReplyHandler } = require("./handler");
const router = express.Router();

router.post("/:threadId/comments/:commentId/replies", authenticateToken, postReplyHandler);
router.delete("/:threadId/comments/:commentId/replies/:replyId", authenticateToken, deleteReplyHandler);

module.exports = router;