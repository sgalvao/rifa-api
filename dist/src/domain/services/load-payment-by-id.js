"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadPaymentById = void 0;
class LoadPaymentById {
    constructor(paymentIntentRepository) {
        this.paymentIntentRepository = paymentIntentRepository;
    }
    async load(id) {
        const payment = await this.paymentIntentRepository.getById(id);
        return payment;
    }
}
exports.LoadPaymentById = LoadPaymentById;
//# sourceMappingURL=load-payment-by-id.js.map