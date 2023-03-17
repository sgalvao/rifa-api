"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinnersRepository = void 0;
const prisma_client_1 = require("@/config/prisma-client");
class WinnersRepository {
    constructor() { }
    async create(params) {
        const winner = await prisma_client_1.prisma.winners.create({
            data: {
                rifaId: params.rifaId,
                rifaImage: params.rifaImage,
                rifaName: params.rifaName,
                winnerId: params.winnerId,
                winnerName: params.winnerName,
                winnerNumber: params.winnerNumber,
            },
        });
        return winner;
    }
    async loadWinners() {
        const winners = await prisma_client_1.prisma.winners.findMany();
        return winners;
    }
}
exports.WinnersRepository = WinnersRepository;
//# sourceMappingURL=WinnersRepository.js.map