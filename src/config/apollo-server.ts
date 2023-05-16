import { ApolloServer } from "apollo-server-express"
import { Express } from "express"
import { makeExecutableSchema } from "@graphql-tools/schema"

import resolvers from "@/main/graphql/resolvers"
import typeDefs from "@/main/graphql/type-defs"
import { authDirective, partnerDirective } from "@/main/graphql/directives"

export const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
})
const schemaWithAuthDirective = authDirective(schema, "auth")
const schemaWithPartnerDirective = partnerDirective(schemaWithAuthDirective, "authPartner")

export const startApolloServer = async (app: Express) => {
	const server = new ApolloServer({
		schema: schemaWithPartnerDirective,
		context: ({ req }) => ({ req }),
		introspection: true,
	})

	await server.start()

	server.applyMiddleware({ app })
}
