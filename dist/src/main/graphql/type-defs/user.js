"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `
  type User {
    id: String
    name: String
    email: String
    phone: String!
  }

  input UserInput {
    name: String!
    email: String!
    phone: String!
  }

  type UserResult {
    id: String
    name: String
    email: String
    phone: String
    token: String
  }

  extend type Query {
    login(phone: String!): UserResult
    loadUser: UserResult @auth
  }

  extend type Mutation {
    createUser(user: UserInput): User
  }
`;
//# sourceMappingURL=user.js.map