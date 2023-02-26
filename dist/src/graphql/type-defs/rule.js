"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `
  type Rules {
    id: Int
    name: String
    description: String
    status: String
    author: User
  }

  input RulesInput {
    name: String!
    description: String!
  }

  extend type Query {
    findAllRules: [Rules] @auth
  }

  extend type Mutation {
    createRule(rule: RulesInput): Rules @auth
  }
`;
//# sourceMappingURL=rule.js.map