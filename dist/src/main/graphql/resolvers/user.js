"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/domain/services");
const authentication_1 = require("@/domain/services/authentication");
const services_2 = require("@/domain/services/");
const providers_1 = require("@/infra/providers");
const UserRepository_1 = require("@/infra/repositories/UserRepository");
const makeCreateAccount = () => {
    const userRepository = new UserRepository_1.UsersRepository();
    const createAccountService = new services_1.CreateAccountService(userRepository);
    return createAccountService;
};
const makeLoadAccountById = () => {
    const userRepository = new UserRepository_1.UsersRepository();
    const loadAccountByIdService = new services_2.LoadUserByIdService(userRepository);
    return loadAccountByIdService;
};
const makeAuthentication = () => {
    const userRepository = new UserRepository_1.UsersRepository();
    const jwtProvider = new providers_1.JwtProvider();
    const authenticationService = new authentication_1.AuthenticationService(userRepository, jwtProvider);
    return authenticationService;
};
exports.default = {
    Query: {
        login: (_, args) => {
            return makeAuthentication().auth(args);
        },
        loadUser: (_, args, { userId }) => {
            return makeLoadAccountById().load(userId);
        },
    },
    Mutation: {
        createUser: async (_, { user }) => makeCreateAccount().create(user),
    },
};
//# sourceMappingURL=user.js.map