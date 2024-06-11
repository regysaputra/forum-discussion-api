/* istanbul ignore file */

const { createContainer } = require("instances-container");
const ThreadRepositoryPostgres = require('./repository/ThreadRepositoryPostgres');
const ThreadRepository = require("../Domains/threads/ThreadRepository");
const pool = require("./database/postgres/pool");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const GetAllThreadUseCase = require("../Applications/use_case/GetAllThreadUseCase");
const UserRepository = require("../Domains/users/UserRepository");
const PasswordHash = require("../Applications/security/PasswordHash");
const UserRepositoryPostgres = require("./repository/UserRepositoryPostgres");
const BcryptPasswordHash = require("./security/BcryptPasswordHash");
const AddUserUseCase = require("../Applications/use_case/AddUserUseCase");
const GetAuthenticationUseCase = require("../Applications/use_case/GetAuthenticationUseCase");
const AuthenticationRepository = require("../Domains/authentications/AuthenticationRepository");
const AuthenticationTokenManager = require("../Applications/security/AuthenticationTokenManager");
const AuthenticationRepositoryPostgres = require("./repository/AuthenticationRepositoryPostgres");
const JwtTokenManager = require("./security/JwtTokenManager");
const AddThreadUseCase = require("../Applications/use_case/AddThreadUseCase");

// creating container
const container = createContainer();

// registering service and repository
container.register([
  {
    key: AuthenticationTokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: jwt,
        },
      ],
    },
  },
  {
    key: AuthenticationRepository.name,
    Class: AuthenticationRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
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
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name
        },
        {
          name: "passwordHash",
          internal: PasswordHash.name
        }
      ]
    }
  },
  {
    key: AddThreadUseCase.name,
    Class: AddThreadUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'threadRepository',
          internal: ThreadRepository.name,
        },
      ],
    },
  },
  {
    key: GetAuthenticationUseCase.name,
    Class: GetAuthenticationUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        }
      ]
    }
  },
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