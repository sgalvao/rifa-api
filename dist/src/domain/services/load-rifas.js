"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadRifas = void 0;
class LoadRifas {
    constructor(rifaRepository) {
        this.rifaRepository = rifaRepository;
    }
    async load() {
        const rifas = await this.rifaRepository.loadAll();
        return rifas;
    }
}
exports.LoadRifas = LoadRifas;
//# sourceMappingURL=load-rifas.js.map