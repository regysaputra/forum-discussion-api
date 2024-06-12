const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const pool = require("../../database/postgres/pool");
const request = require("supertest");
const app = require("../app");

describe("/users endpoint", () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  }, 20000);

  describe("when POST /users", () => {
    it("should response 400 when request payload not contain needed property", async () => {
      // Arrange
      const requestPayload = {
        fullname: "Regy Saputra",
        password: "12345"
      };

      // Action
      const response = await request(app).post("/users").send(requestPayload);

      // Assert
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada");
    }, 10000);

    it("should response 400 when request payload not meet data type specification", async () => {
      // Arrange
      const requestPayload = {
        username: 'regysaputra',
        password: '12345',
        fullname: ['Regy Saputra'],
      };

      // Action
      const response = await request(app).post("/users").send(requestPayload);

      // Assert
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat user baru karena tipe data tidak sesuai');
    }, 10000);

    it("should response 201 and persisted user", async () => {
      // Arrange
      const requestPayload = {
        username: "egiputra",
        password: "12345",
        fullname: "Egi Putra"
      };

      // Action
      const response = await request(app).post("/users").send(requestPayload);

      // Assert
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.addedUser).toBeDefined();
    }, 10000);

    it('should response 400 when username more than 50 character', async () => {
      // Arrange
      const requestPayload = {
        username: 'regysaputraqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm',
        password: '12345',
        fullname: 'Regy Saputra',
      };

      // Action
      const response = await request(app).post("/users").send(requestPayload);

      // Assert
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat user baru karena karakter username melebihi batas limit');
    }, 10000);

    it('should response 400 when username contain restricted character', async () => {
      // Arrange
      const requestPayload = {
        username: '@=regysaputra',
        password: '12345',
        fullname: 'Regy Saputra',
      };

      // Action
      const response = await request(app).post("/users").send(requestPayload);

      // Assert
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat user baru karena username mengandung karakter terlarang');
    }, 10000);

    it('should response 400 when username unavailable', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'regysaputra' });
      const requestPayload = {
        username: 'regysaputra',
        fullname: 'Regy Saputra',
        password: '12345',
      };

      // Action
      const response = await request(app).post("/users").send(requestPayload);

      // Assert
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('username tidak tersedia');
    }, 10000);

    it('should response 201 and persisted user', async () => {
      // Arrange
      const requestPayload = {
        username: 'regysaputra',
        password: '12345',
        fullname: 'Regy Saputra',
      };

      // Action
      const response = await request(app).post("/users").send(requestPayload);

      // Assert
      const responseJson = JSON.parse(response.text);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedUser).toBeDefined();
    }, 10000);
  });
});