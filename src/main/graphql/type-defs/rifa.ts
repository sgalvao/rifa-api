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
    isFinished: Boolean
    finishedDate: DateTime
  }

  input RifaInput {
    name: String!
    price: Float!
    authorId: String!
    status: String
  }

  type WinnerResult {
    id: String
    winnerName: String
    winnerId: String
    winnerNumber: Int
    rifaName: String
    rifaImage: String
    rifaId: String
    createdAt: DateTime
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
    checkWinner(rifaId: String!, drawnNumber: Int!): WinnerResult @auth
  }
`;
