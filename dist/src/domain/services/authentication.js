"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const env_1 = __importDefault(require("@/config/env"));
class AuthenticationService {
    constructor(hashProvider, usersRepository, jwtProvider) {
        this.hashProvider = hashProvider;
        this.usersRepository = usersRepository;
        this.jwtProvider = jwtProvider;
    }
    async auth(params) {
        console.log("🚀 ~ file: authentication.ts ~ line 14 ~ AuthenticationService ~ auth ~ params", params);
        const user = await this.usersRepository.findByEmail(params.email);
        if (!user) {
            throw new Error("User not found");
        }
        const isValidPassword = await this.hashProvider.compareHash(params.password, user.password);
        console.log("🚀 ~ file: authentication.ts ~ line 27 ~ AuthenticationService ~ auth ~ isValidPassword", isValidPassword);
        if (!isValidPassword) {
            throw new Error(" password or username invalid!");
        }
        const token = this.jwtProvider.encryptToken(user.email, env_1.default.jwtSecret);
        return Object.assign(user, { token });
    }
}
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.js.map