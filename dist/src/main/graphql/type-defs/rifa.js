"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `
  type Rifa {
    id: String
    name: String!
    price: Float!
    authorId: String!
    participants: Int
    status: String
    winnerNumber: Int
    soldNumbers: [Int]
  }

  input RifaInput {
    name: String!
    price: Float!
    authorId: String!
    status: String
  }

  extend type Mutation {
    createRifa(
      name: String!
      price: Float!
      authorId: String!
      status: String
      image: String!
    ): Rifa
  }

  extend type Query {
    loadRifas: [Rifa]
    loadRifa(rifaId: String!): Rifa
  }
`;
//# sourceMappingURL=rifa.js.map