const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const pool = require("../../database/postgres/pool");
const request = require("supertest");
const app = require("../app");
const container = require("../../container");
const AuthenticationTokenManager = require("../../../Applications/security/AuthenticationTokenManager");

describe("threads endpoint", () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  }, 10000);

  describe('when POST /threads', () => {
    it('should response 401 when include wrong access token', async () => {
      // Arrange
      const requestPayload = {
        title: 'Thread Title',
        body: 'body',
      };
      const accessToken = 'wrong_token';

      // Action
      const response = await request(app)
        .post("/threads")
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
        title: 'Thread Title',
        body: 'body',
      };

      // Action
      const response = await request(app)
        .post("/threads")
        .send(requestPayload);

      // Assert
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Missing authentication');
    }, 10000);

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const requestPayload = {
        title: 'Thread Title',
      };

      await UsersTableTestHelper.addUser({});
      const accessToken = await container.getInstance(AuthenticationTokenManager.name).createAccessToken({ username: 'regysaputra', password: '12345' });

      // Action
      const response = await request(app)
        .post("/threads")
        .send(requestPayload)
        .set("Authorization", `Bearer ${accessToken}`);

      // Assert
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada');
    }, 10000);

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const requestPayload = {
        title: 123,
        body: 'content',
      };

      await UsersTableTestHelper.addUser({});
      const accessToken = await container.getInstance(AuthenticationTokenManager.name).createAccessToken({ username: 'regysaputra', password: '12345' });

      // Action
      const response = await request(app)
        .post("/threads")
        .send(requestPayload)
        .set("Authorization", `Bearer ${accessToken}`);

      // Assert
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat thread baru karena tipe data tidak sesuai');
    }, 20000);

    it('should response 201 and persisted thread', async () => {
      // Arrange
      const requestPayload = {
        title: 'Thread Title',
        body: 'content',
      };

      await UsersTableTestHelper.addUser({});
      const accessToken = await container.getInstance(AuthenticationTokenManager.name).createAccessToken({ username: 'regysaputra', id: 'user-123' });

      // Action
      const response = await request(app)
        .post("/threads")
        .send(requestPayload)
        .set("Authorization", `Bearer ${accessToken}`);

      // Assert
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedThread).toBeDefined();
    }, 10000);
  });

  describe('when GET /threads', () => {
    it('should return 200 when get thread successfuly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});

      // Action
      const response = await request(app).get("/threads");

      // Assert
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    }, 10000);
  });
});