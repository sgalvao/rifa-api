import { gql } from "apollo-server-express"

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
		status: String
	}

	type Purchased {
		numbers: [Int]
		rifaId: String
		image: String
		name: String
		status: String
	}

	extend type Mutation {
		createPayment(quantity: Int!, rifaId: String!, referralId: String): Payment @auth
	}

	extend type Query {
		loadPaymentById(id: String): Payment @auth
		loadPurchasedNumbers: [Purchased] @auth
	}
`
