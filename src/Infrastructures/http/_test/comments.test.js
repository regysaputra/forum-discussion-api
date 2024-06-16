const AuthenticationTokenManager = require("../../../Applications/security/AuthenticationTokenManager");
const CommentsTableTestHelper = require("../../../../tests/CommentsTableTestHelper");
const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const pool = require("../../database/postgres/pool");
const request = require("supertest");
const app = require("../app");
const container = require("../../container");

describe("comments endpoint", () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
  }, 20000);

  describe('when POST /threads/:threadId/comments', () => {
    it('should response 401 when include wrong access token', async () => {
      // Arrange
      const requestPayload = {
        content: 'my comment',
      };
      const accessToken = 'wrong_token';

      // Action
      const response = await request(app)
        .post("/threads/thread-123/comments")
        .send(requestPayload)
        .set("Authorization", `Bearer ${accessToken}`);

      // Assert
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('access token tidak valid');
    }, 10000);

    it('should response 401 when not include access token in request header', async () => {
      // Arrange
      const requestPayload = {
        content: 'my comment'
      };

      // Action
      const response = await request(app)
        .post("/threads/thread-123/comments")
        .send(requestPayload);

      // Assert
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Missing authentication');
    }, 10000);

    it('should response 404 when thread is not found', async () => {
      // Arrange
      const requestPayload = {
        content: 'reply',
      };

      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      const accessToken = await container.getInstance(AuthenticationTokenManager.name).createAccessToken({ username: 'regysaputra', password: '12345' });

      // Action
      const response = await request(app)
        .post("/threads/thread-100/comments")
        .send(requestPayload)
        .set("Authorization", `Bearer ${accessToken}`);

      // Assert
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Thread tidak ditemukan');
    }, 20000);

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const requestPayload = {};

      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      const accessToken = await container.getInstance(AuthenticationTokenManager.name).createAccessToken({ username: 'regysaputra', password: '12345' });

      // Action
      const response = await request(app)
        .post("/threads/thread-123/comments")
        .send(requestPayload)
        .set("Authorization", `Bearer ${accessToken}`);

      // Assert
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat komentar baru karena properti yang dibutuhkan tidak ada');
    }, 10000);

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const requestPayload = {
        content: 123
      };

      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      const accessToken = await container.getInstance(AuthenticationTokenManager.name).createAccessToken({ username: 'regysaputra', password: '12345' });

      // Action
      const response = await request(app)
        .post("/threads/thread-123/comments")
        .send(requestPayload)
        .set("Authorization", `Bearer ${accessToken}`);

      // Assert
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat komentar baru karena tipe data tidak sesuai');
    }, 20000);

    it('should response 201 and persisted thread', async () => {
      // Arrange
      const requestPayload = {
        content: 'my comment'
      };

      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      const accessToken = await container.getInstance(AuthenticationTokenManager.name).createAccessToken({ username: 'regysaputra', id: 'user-123' });

      // Action
      const response = await request(app)
        .post("/threads/thread-123/comments")
        .send(requestPayload)
        .set("Authorization", `Bearer ${accessToken}`);

      // Assert
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedComment).toBeDefined();
    }, 10000);
  });
});