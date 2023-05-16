import { gql } from "apollo-server-express"

export default gql`
	type Partner {
		id: String
		name: String
		email: String
		phone: String
		referralCode: String
		pixCode: String
		balance: Float
		totalBalance: Float
	}

	type SalesResult {
		name: String
		value: Float
		date: DateTime
	}

	type Relatory {
		name: String
		value: Float
		status: String
		date: DateTime
	}

	type Sales {
		sales: [SalesResult]
		count: Int
	}

	input PartnerInput {
		name: String!
		email: String!
		phone: String!
		password: String!
		pixCode: String!
		cpf: String!
	}

	type PartnerResult {
		id: String
		name: String
		email: String
		phone: String
		token: String
	}

	extend type Query {
		loginPartner(email: String!, password: String!): PartnerResult
		loadPartner: Partner @authPartner
		loadPartnerSales: Sales @authPartner
		loadPartnerRelatory(offset: Int!): [Relatory] @authPartner
	}

	extend type Mutation {
		createPartner(user: PartnerInput): Partner
	}
`
