"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountService = void 0;
class CreateAccountService {
    constructor(usersRepository, hashProvider) {
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
    }
    async create(param) {
        const passwordEncrypted = await this.hashProvider.createHash(param.password, 10);
        return this.usersRepository.create({
            ...param,
            password: passwordEncrypted,
        });
    }
}
exports.CreateAccountService = CreateAccountService;
//# sourceMappingURL=create-account.js.map