import { gql } from "apollo-server-express";

export default gql`
  type Rifa {
    id: String
    name: String!
    price: Float!
    authorId: String!
    participants: Int
    status: String
    winnerNumber: Int
    winnerName: String
    soldNumbers: [Int]
    image: String
    isFinished: boolean
    
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
    checkWinner:(rifaId: String! drawnNumber: Int!): Rifa @auth
  }
`;
