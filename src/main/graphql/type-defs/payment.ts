import { gql } from "apollo-server-express";

export default gql`
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
