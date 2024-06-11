/**
 * /users:
 *  post:
 *    summary: Create new user.
 *    description: Create new user.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RegisterUser'
 *    responses:
 *      '201':
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisteredUser'
 */

const express = require("express");
const router = express.Router();
const postUserHandler = require("./handler");

router.post("/", postUserHandler);

module.exports = router;