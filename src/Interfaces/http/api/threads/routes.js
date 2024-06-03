/**
 * @swagger
 * /threads:
 *  get:
 *    summary: Get all thread.
 *    description: Get all thread.
 *    responses:
 *      '200':
 *        description: A successful response
 */

const express = require("express");
const getAllThreadHandler = require("./handler");
const router = express.Router();

router.get("/", getAllThreadHandler);

module.exports = router;