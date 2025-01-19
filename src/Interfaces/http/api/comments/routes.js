const express = require('express');
const authenticateToken = require("../../../../Infrastructures/middleware/authenticateToken");
const { postCommentHandler, deleteCommentHandler } = require("./handler");
const router = express.Router();

router.post("/:threadId/comments", authenticateToken, postCommentHandler);
router.delete("/:threadId/comments/:commentId", authenticateToken, deleteCommentHandler);

module.exports = router;