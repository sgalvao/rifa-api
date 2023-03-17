"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `
  type Payment {
    id: String
    ownerId: String
    numbers: [Int]
    quantity: Int
    transactionId: String
    rifaId: String
    copyPasteCode: String
    totalValue: Float
    value: Float
    createdAt: DateTime
  }

  type Purchased {
    numbers: [Int]
    rifaId: String
    image: String
    name: String
    status: String

  }

  extend type Mutation {
    createPayment(quantity: Int!, rifaId: String!): Payment @auth
  }

  extend type Query {
    loadPaymentById(id: String): Payment @auth
    loadPurchasedNumbers: [Purchased] @auth
  }
`;
//# sourceMappingURL=payment.js.map