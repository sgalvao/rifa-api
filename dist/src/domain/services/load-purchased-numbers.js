"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadPurchasedNumbers = void 0;
class LoadPurchasedNumbers {
    constructor(paymentIntentRepository, rifaRepository) {
        this.paymentIntentRepository = paymentIntentRepository;
        this.rifaRepository = rifaRepository;
    }
    async load(userId) {
        const purchased = await this.paymentIntentRepository.loadByOwnerId(userId);
        let purchasedNumbers = [];
        for (let i = 0; i < purchased.length; i++) {
            const rifa = await this.rifaRepository.loadById(purchased[i].rifaId);
            purchasedNumbers.push({
                numbers: purchased[i].numbers,
                rifaId: purchased[i].rifaId,
                name: rifa.name,
                status: rifa.status,
                image: rifa.image,
            });
        }
        return purchasedNumbers;
    }
}
exports.LoadPurchasedNumbers = LoadPurchasedNumbers;
//# sourceMappingURL=load-purchased-numbers.js.map