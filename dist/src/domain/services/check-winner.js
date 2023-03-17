"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckWinnerService = void 0;
class CheckWinnerService {
    constructor(paymentIntentRepository, rifaRepository, usersRepository, winnersRepository) {
        this.paymentIntentRepository = paymentIntentRepository;
        this.rifaRepository = rifaRepository;
        this.usersRepository = usersRepository;
        this.winnersRepository = winnersRepository;
    }
    async check(rifaId, drawnNumber) {
        const isSold = await this.rifaRepository.verifyNumber(drawnNumber, rifaId);
        if (!isSold) {
            throw new Error("Número não foi vendido");
        }
        const payment = await this.paymentIntentRepository.verifyWinner(rifaId, drawnNumber);
        if (!payment) {
            throw new Error("Numero não foi pago!");
        }
        const user = await this.usersRepository.findById(payment.ownerId);
        const rifaWinner = await this.rifaRepository.finish({
            rifaId,
            drawnNumber,
            winnerId: user.id,
            winnerName: user.name,
        });
        const winnerParams = {
            rifaId: rifaWinner.id,
            rifaImage: rifaWinner.image,
            winnerId: rifaWinner.winnerId,
            winnerName: rifaWinner.winnerName,
            winnerNumber: rifaWinner.winnerNumber,
        };
        const createWinner = await this.winnersRepository.create(winnerParams);
        return {
            winnerName: createWinner.winnerName,
            winnerDate: createWinner.createdAt,
            rifaImage: createWinner.rifaImage,
            rifaName: createWinner.rifaName,
        };
    }
}
exports.CheckWinnerService = CheckWinnerService;
//# sourceMappingURL=check-winner.js.map