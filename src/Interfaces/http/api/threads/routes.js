/**
 * /threads:
 *  get:
 *    summary: Get all thread.
 *    description: Get all thread.
 *    responses:
 *      '200':
 *        description: A successful response
 */

const express = require("express");
const router = express.Router();
const authenticateToken = require("../../../../Infrastructures/middleware/authenticateToken");
const { getAllThreadHandler, postThreadHandler } = require("./handler");
 
router.get("/", getAllThreadHandler);
router.post("/", authenticateToken, postThreadHandler);

module.exports = router;