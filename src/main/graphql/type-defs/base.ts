import { gql } from "apollo-server-express"

export default gql`
	scalar DateTime

	directive @admin on FIELD_DEFINITION
	directive @auth on FIELD_DEFINITION
	directive @authPartner on FIELD_DEFINITION

	type Query {
		_: String
	}

	type Mutation {
		_: String
	}
`
