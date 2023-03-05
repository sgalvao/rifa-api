"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadRifaById = void 0;
class LoadRifaById {
    constructor(rifaRepository) {
        this.rifaRepository = rifaRepository;
    }
    async load(id) {
        const rifa = await this.rifaRepository.loadById(id);
        console.log(id);
        return rifa;
    }
}
exports.LoadRifaById = LoadRifaById;
//# sourceMappingURL=load-rifa-by-id.js.map