/**
 * @swagger
 * components:
 *  schemas:
 *    RegisterUser:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: The id of registered user
 *        username:
 *          type: string
 *          description: The username of registered user
 *        fullname:
 *          type: string
 *          description: The fullname of registered user
 */

class RegisteredUser {
  constructor(payload) {
    this.#verifyPayload(payload);
    const { id, username, fullname } = payload;

    this.id = id;
    this.username = username;
    this.fullname = fullname;
  }

  // eslint-disable-next-line class-methods-use-this
  #verifyPayload({ id, username, fullname }) {
    if (!id || !username || !fullname) {
      throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof username !== 'string' || typeof fullname !== 'string') {
      throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RegisteredUser;
