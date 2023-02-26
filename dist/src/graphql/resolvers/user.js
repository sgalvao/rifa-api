"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/domain/services");
const authentication_1 = require("@/domain/services/authentication");
const providers_1 = require("@/infra/providers");
const UserRepository_1 = require("@/infra/repositories/UserRepository");
const makeCreateAccount = () => {
    const userRepository = new UserRepository_1.UsersRepository();
    const hashProvider = new providers_1.HashProvider();
    const createAccountService = new services_1.CreateAccountService(userRepository, hashProvider);
    return createAccountService;
};
const makeAuthentication = () => {
    const userRepository = new UserRepository_1.UsersRepository();
    const hashProvider = new providers_1.HashProvider();
    const jwtProvider = new providers_1.JwtProvider();
    const authenticationService = new authentication_1.AuthenticationService(hashProvider, userRepository, jwtProvider);
    return authenticationService;
};
exports.default = {
    Query: {
        login: (_, args) => {
            console.log("🚀 ~ file: user.ts ~ line 31 ~ args", args);
            return makeAuthentication().auth(args);
        },
    },
    Mutation: {
        createUser: async (_, { user }) => makeCreateAccount().create(user),
    },
};
//# sourceMappingURL=user.js.map