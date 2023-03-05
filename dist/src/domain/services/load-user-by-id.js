"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadUserByIdService = void 0;
class LoadUserByIdService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async load(id) {
        const user = this.usersRepository.findById(id);
        return user;
    }
}
exports.LoadUserByIdService = LoadUserByIdService;
//# sourceMappingURL=load-user-by-id.js.map