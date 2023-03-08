"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckWinnerService = void 0;
class CheckWinnerService {
    constructor(paymentIntentRepository, rifaRepository, usersRepository) {
        this.paymentIntentRepository = paymentIntentRepository;
        this.rifaRepository = rifaRepository;
        this.usersRepository = usersRepository;
    }
    async check(rifaId, drawnNumber) {
        const isSold = await this.rifaRepository.verifyNumber(drawnNumber, rifaId);
        if (!isSold) {
            throw new Error("Número não foi vendido");
        }
        const payment = await this.paymentIntentRepository.verifyWinner(rifaId, drawnNumber);
        const user = await this.usersRepository.findById(payment.ownerId);
        return user;
    }
}
exports.CheckWinnerService = CheckWinnerService;
//# sourceMappingURL=check-winner.js.map