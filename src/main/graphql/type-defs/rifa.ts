import { gql } from "apollo-server-express"

export default gql`
	type RankingPrize {
		firstPrize: Float
		secondPrize: Float
		thirdPrize: Float
	}

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
		description: String
		firstPrize: Float
		secondPrize: Float
		thirdPrize: Float
	}

	input RifaInput {
		name: String!
		price: Float!
		authorId: String!
		status: String
		firstPrize: Float
		secondPrize: Float
		thirdPrize: Float
	}

	type RankingResult {
		name: String
		count: Int
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
			description: String!
		): Rifa @admin
		checkWinner(rifaId: String!, drawnNumber: Int!): WinnerResult @admin
	}

	extend type Query {
		loadRifas: [Rifa]
		loadRifa(rifaId: String!): Rifa
		loadRanking(rifaId: String!): [RankingResult]
	}
`
