"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `
  type Payment {
    ownerId: String
    numbers: [Int]
    quantity: Int
    transactionId: String
    rifaId: String
  }

  extend type Mutation {
    createPayment(quantity: Int!, rifaId: String!): Payment @auth
  }
`;
//# sourceMappingURL=payment.js.map