"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const env_1 = __importDefault(require("@/config/env"));
class AuthenticationService {
    constructor(usersRepository, jwtProvider) {
        this.usersRepository = usersRepository;
        this.jwtProvider = jwtProvider;
    }
    async auth(params) {
        const user = await this.usersRepository.findByPhone(params.phone);
        if (!user) {
            throw new Error("Usuário não encontrado!");
        }
        const token = this.jwtProvider.encryptToken(user.phone, env_1.default.jwtSecret);
        return Object.assign(user, { token });
    }
}
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.js.map