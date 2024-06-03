class AddReply {
  constructor(payload, commentId, userId) {
    if (payload === null) {
      throw new Error('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    this.#verifyPayload(payload);

    const { content } = payload;

    this.content = content;
    this.commentId = commentId;
    this.userId = userId;
  }

  // eslint-disable-next-line class-methods-use-this
  #verifyPayload({ content }) {
    if (!content) {
      throw new Error('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof content !== 'string') {
      throw new Error('ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddReply;
