import { gql } from "apollo-server-express"

export default gql`
	type Admin {
		id: String
		name: String
		email: String
		phone: String
		token: String
	}

	input AdminInput {
		name: String!
		password: String!
		email: String!
		phone: String!
	}

	type SalesResult {
		soldNumbers: Int
		totalValue: Float
		restNumber: Int
		orders: Int
	}

	type PaymentResult {
		name: String
		value: Float
		date: DateTime
	}

	type SalesRelatory {
		name: String
		value: Float
		date: DateTime
		status: String
		phone: String
	}

	extend type Query {
		adminLogin(email: String!, password: String!): Admin
		loadAdmin: Admin @admin
		loadSalesAmount: SalesResult @admin
		loadSalesRelatory(offset: Int): [SalesRelatory] @admin
		loadPartners: [Partner] @admin
	}

	extend type Mutation {
		createAdmin(admin: AdminInput!): Admin @admin
	}
`
