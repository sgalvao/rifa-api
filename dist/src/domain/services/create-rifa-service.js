"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRifaService = void 0;
class CreateRifaService {
    constructor(rifaRepository) {
        this.rifaRepository = rifaRepository;
    }
    async create(params) {
        const rifa = await this.rifaRepository.create(params);
        return rifa;
    }
}
exports.CreateRifaService = CreateRifaService;
//# sourceMappingURL=create-rifa-service.js.map