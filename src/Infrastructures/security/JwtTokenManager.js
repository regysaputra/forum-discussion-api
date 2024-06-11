const AuthenticationTokenManager = require('../../Applications/security/AuthenticationTokenManager');
const config = require('../../Commons/config');
const InvariantError = require('../../Commons/exceptions/InvariantError');

class JwtTokenManager extends AuthenticationTokenManager {
  #jwt;

  constructor(jwt) {
    super();
    this.#jwt = jwt;
  }

  async createAccessToken(payload) {
    return this.#jwt.sign(payload, config.security.accessTokenKey, { expiresIn: "12h" });
  }

  async createRefreshToken(payload) {
    return this.#jwt.sign(payload, config.security.refreshTokenKey, { expiresIn: "24h" });
  }

  // @ts-ignore
  async verifyAccessToken(token) {
    try {
      const decoded = this.#jwt.verify(token, config.security.accessTokenKey);

      return true;
    } catch (error) {
      return false;
    }
  }

  async verifyRefreshToken(token) {
    try {
      this.#jwt.verify(token, config.security.refreshTokenKey);
    } catch (error) {
      throw new InvariantError('refresh token tidak valid');
    }
  }

  async decodePayload(token) {
    try {
      const artifacts = this.#jwt.verify(token, config.security.accessTokenKey);
      return artifacts;
    } catch (error) {
      throw new InvariantError('Token tidak bisa di decode');
    }
  }
}

module.exports = JwtTokenManager;
