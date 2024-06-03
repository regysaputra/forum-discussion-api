const AddReply = require('../AddReply');

describe('AddReply entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {};
    const commentId = 'comment-123';
    const userId = 'user-123';

    // Action & Assert
    expect(() => new AddReply(payload, commentId, userId)).toThrow('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      content: 123,
    };
    const commentId = 'comment-123';
    const userId = 'user-123';

    // Action & Assert
    expect(() => new AddReply(payload, commentId, userId)).toThrow('ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create AddReply object correctly', () => {
    // Arrange
    const payload = {
      content: 'reply',
    };
    const commentId = 'comment-123';
    const userId = 'user-123';

    // Action
    const addReply = new AddReply(payload, commentId, userId);

    // Assert
    expect(addReply).toBeInstanceOf(AddReply);
    expect(addReply.content).toEqual(payload.content);
    expect(addReply.commentId).toEqual(commentId);
    expect(addReply.userId).toEqual(userId);
  });
});
