/* istanbul ignore file */

const { createContainer } = require("instances-container");
const ThreadRepositoryPostgres = require('./repository/ThreadRepositoryPostgres');
const ThreadRepository = require("../Domains/threads/ThreadRepository");
const pool = require("./database/postgres/pool");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const GetAllThreadUseCase = require("../Applications/use_case/GetAllThreadUseCase");
const UserRepository = require("../Domains/users/UserRepository");
const PasswordHash = require("../Applications/security/PasswordHash");
const UserRepositoryPostgres = require("./repository/UserRepositoryPostgres");
const BcryptPasswordHash = require("./security/BcryptPasswordHash");

// creating container
const container = createContainer();

// registering service and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool
        },
        {
          concrete: nanoid
        }
      ]
    }
  },
  {
    key: ThreadRepository.name,
    Class: ThreadRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool
        },
        {
          concrete: nanoid
        }
      ]
    }
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt
        }
      ]
    }
  }
]);

// registering use cases
container.register([
  {
    key: GetAllThreadUseCase.name,
    Class: GetAllThreadUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: 'threadRepository',
          internal: ThreadRepository.name,
        }
      ]
    }
  }
]);

module.exports = container;