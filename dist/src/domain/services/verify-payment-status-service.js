"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyPaymentStatusService = void 0;
class VerifyPaymentStatusService {
    constructor(rifaRepository, paymentIntentRepository, mercadoPagoProvider) {
        this.rifaRepository = rifaRepository;
        this.paymentIntentRepository = paymentIntentRepository;
        this.mercadoPagoProvider = mercadoPagoProvider;
    }
    async verify() {
        const paymentIntent = await this.paymentIntentRepository.verify();
        const mercadoPago = this.mercadoPagoProvider.connect();
        // if (!paymentIntent) return;
        for (let i = 0; i < paymentIntent.length; i++) {
            const result = await mercadoPago.payment.get(parseInt(paymentIntent[i].transactionId));
            const isExpired = Boolean(new Date(result.body.date_of_expiration) < new Date());
            if (result.body.status === "pending" && isExpired) {
                const soldNumbers = await this.rifaRepository.loadById(paymentIntent[i].rifaId);
                const removedNumbers = soldNumbers.soldNumbers.filter((num) => !paymentIntent[i].numbers.includes(num));
                this.rifaRepository.removeNumbers(paymentIntent[i].rifaId, removedNumbers);
                return this.paymentIntentRepository.updateStatus(paymentIntent[i].id, "expired");
            }
            if (result.body.status === "approved") {
                return this.paymentIntentRepository.updateStatus(paymentIntent[i].id, "approved");
            }
        }
    }
}
exports.VerifyPaymentStatusService = VerifyPaymentStatusService;
//# sourceMappingURL=verify-payment-status-service.js.map