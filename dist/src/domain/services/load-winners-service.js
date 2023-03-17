"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadWinners = void 0;
class LoadWinners {
    constructor(winnersRepository) {
        this.winnersRepository = winnersRepository;
    }
    async load() {
        const winners = await this.winnersRepository.loadWinners();
        return winners;
    }
}
exports.LoadWinners = LoadWinners;
//# sourceMappingURL=load-winners-service.js.map