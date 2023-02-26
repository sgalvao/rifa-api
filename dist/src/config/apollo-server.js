"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApolloServer = exports.schema = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("@graphql-tools/schema");
const resolvers_1 = __importDefault(require("@/graphql/resolvers"));
const type_defs_1 = __importDefault(require("@/graphql/type-defs"));
const directives_1 = require("@/graphql/directives");
exports.schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: type_defs_1.default,
    resolvers: resolvers_1.default
});
const schemaWithAuthDirective = (0, directives_1.authDirective)(exports.schema, 'auth');
const startApolloServer = async (app) => {
    const server = new apollo_server_express_1.ApolloServer({
        schema: schemaWithAuthDirective,
        context: ({ req }) => ({ req }),
        introspection: true
    });
    await server.start();
    server.applyMiddleware({ app });
};
exports.startApolloServer = startApolloServer;
//# sourceMappingURL=apollo-server.js.map