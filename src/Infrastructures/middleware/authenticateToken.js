const AuthenticationTokenManager = require("../../Applications/security/AuthenticationTokenManager");
const AuthenticationError = require("../../Commons/exceptions/AuthenticationError");
const container = require("../container");

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if(!token) {
    const authenticationError = new AuthenticationError("Missing authentication");

    return next(authenticationError);
  }

  const isValidToken = await container.getInstance(AuthenticationTokenManager.name).verifyAccessToken(token);

  if (!isValidToken) {
    const authenticationError = new AuthenticationError("access token tidak valid");

    return next(authenticationError);
  }

  const user = await container.getInstance(AuthenticationTokenManager.name).decodePayload(token);

  req.credentials = user;

  next();
}

module.exports = authenticateToken;