import { ApolloServer } from "apollo-server-express"
import { Express } from "express"
import { makeExecutableSchema } from "@graphql-tools/schema"

import resolvers from "@/main/graphql/resolvers"
import typeDefs from "@/main/graphql/type-defs"
import { adminDirective, authDirective, partnerDirective } from "@/main/graphql/directives"

export const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
})
const authenticationDirective = authDirective(schema, "auth")
const partnerDirectiveSchema = partnerDirective(authenticationDirective, "authPartner")
const schemaWithAdminDirective = adminDirective(partnerDirectiveSchema, "admin")

export const startApolloServer = async (app: Express) => {
	const server = new ApolloServer({
		schema: schemaWithAdminDirective,
		context: ({ req }) => ({ req }),
		introspection: true,
	})

	await server.start()

	server.applyMiddleware({ app, cors: { origin: "*" } })
}
