"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authDirective = void 0;
const graphql_1 = require("graphql");
const apollo_server_express_1 = require("apollo-server-express");
const utils_1 = require("@graphql-tools/utils");
const repositories_1 = require("@/infra/repositories");
const providers_1 = require("@/infra/providers");
const services_1 = require("@/domain/services");
const makeLoadUserToken = () => {
    const userRepository = new repositories_1.UsersRepository();
    const jwtProvider = new providers_1.JwtProvider();
    const loadUserByTokenService = new services_1.LoadUserByTokenService(userRepository, jwtProvider);
    return loadUserByTokenService;
};
const authDirective = (schema, directiveName) => {
    return (0, utils_1.mapSchema)(schema, {
        [utils_1.MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            const authDirective = (0, utils_1.getDirective)(schema, fieldConfig, directiveName)?.[0];
            if (authDirective) {
                const { resolve = graphql_1.defaultFieldResolver } = fieldConfig;
                fieldConfig.resolve = async function (source, args, context, info) {
                    const accessToken = context?.req?.headers?.["authorization"];
                    // Write here your own logic to get the user from accessToken
                    const user = await makeLoadUserToken().load(accessToken);
                    if (!user) {
                        throw new apollo_server_express_1.ForbiddenError("Not authorized");
                    }
                    return resolve(source, args, Object.assign(context, { userId: user.id }), info);
                };
                return fieldConfig;
            }
        },
    });
};
exports.authDirective = authDirective;
//# sourceMappingURL=index.js.map