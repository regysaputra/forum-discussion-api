/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
class PasswordHash {
  async hash(_password) {
    throw new Error('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  }

  async comparePassword(_plain, _encrypted) {
    throw new Error('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = PasswordHash;
