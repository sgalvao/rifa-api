import { gql } from "apollo-server-express"

export default gql`
	type User {
		id: String
		name: String
		email: String
		phone: String!
	}

	input UserInput {
		name: String!
		email: String!
		phone: String!
	}

	type UserResult {
		id: String
		name: String
		email: String
		phone: String
		token: String
	}

	extend type Query {
		login(phone: String!): UserResult
		loadUser: UserResult @auth
	}

	extend type Mutation {
		createUser(user: UserInput): User
	}
`
