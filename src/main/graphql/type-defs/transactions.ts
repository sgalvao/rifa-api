import { gql } from "apollo-server-express"

export default gql`
	type Transaction {
		date: DateTime
		value: Float
	}

	extend type Query {
		loadTransactions: [Transaction] @authPartner
	}
`
