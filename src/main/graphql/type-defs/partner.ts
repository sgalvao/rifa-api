import { gql } from "apollo-server-express"

export default gql`
	type Partner {
		id: String
		name: String
		email: String
		phone: String
		referralCode: String
		pixCode: String
	}

	input PartnerInput {
		name: String!
		email: String!
		phone: String!
		password: String!
		pixCode: String
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
	}

	extend type Mutation {
		createPartner(user: PartnerInput): Partner
	}
`
