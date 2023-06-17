import { gql } from "apollo-server-express"

export default gql`
	type Winner {
		rifaId: String
		rifaImage: String
		rifaName: String
		winnerId: String
		winnerName: String
		winnerNumber: Int
		date: DateTime
		quantityNumbers: Int
		numbers: [Int]
		paymentId: String
		phone: String
		createdAt: DateTime
	}

	extend type Query {
		loadWinners: [Winner]
	}
`
