const InvariantError = require('../../Commons/exceptions/InvariantError');
const AuthenticationRepository = require('../../Domains/authentications/AuthenticationRepository');

class AuthenticationRepositoryPostgres extends AuthenticationRepository {
  #pool;

  constructor(pool) {
    super();
    this.#pool = pool;
  }

  async addToken(token) {
    const query = {
      text: 'INSERT INTO authentications VALUES ($1)',
      values: [token],
    };

    await this.#pool.query(query);
  }

  async checkAvailabilityToken(token) {
    const query = {
      text: 'SELECT * FROM authentications WHERE token = $1',
      values: [token],
    };

    const result = await this.#pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('refresh token tidak ditemukan di database');
    }
  }

  async deleteToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token],
    };

    await this.#pool.query(query);
  }
}

module.exports = AuthenticationRepositoryPostgres;
