import { gql } from "apollo-server-express";

export default gql`
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

  extend type Mutation {
    createPayment(quantity: Int!, rifaId: String!): Payment @auth
  }

  extend type Query {
    loadPaymentById(id: String): Payment @auth
  }
`;
