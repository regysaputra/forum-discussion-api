class AddedReply {
  constructor(payload) {
    this.#verifyPayload(payload);

    const { id, content, owner } = payload;

    this.id = id;
    this.content = content;
    this.owner = owner;
  }

  // eslint-disable-next-line class-methods-use-this
  #verifyPayload({ id, content, owner }) {
    if (!id || !content || !owner) {
      throw new Error('ADDED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof content !== 'string' || typeof owner !== 'string') {
      throw new Error('ADDED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedReply;
