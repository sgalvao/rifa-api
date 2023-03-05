"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountService = void 0;
class CreateAccountService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(param) {
        const validateEmail = await this.usersRepository.findByEmail(param.email);
        const validatePhone = await this.usersRepository.findByPhone(param.phone);
        if (validatePhone) {
            throw new Error("Telefone já cadastrado!");
        }
        if (validateEmail) {
            throw new Error("Email já cadastrado!");
        }
        return this.usersRepository.create({
            ...param,
        });
    }
}
exports.CreateAccountService = CreateAccountService;
//# sourceMappingURL=create-account.js.map