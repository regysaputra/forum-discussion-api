const express = require("express");
const router = express.Router();
const authenticateToken = require("../../../../Infrastructures/middleware/authenticateToken");
const { getAllThreadHandler, postThreadHandler, getThreadHandler } = require("./handler");
 
router.get("/", getAllThreadHandler);
router.get("/:threadId", getThreadHandler);
router.post("/", authenticateToken, postThreadHandler);

module.exports = router;