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
        if (!paymentIntent)
            return;
        let result;
        for (let i = 0; i < paymentIntent.length; i++) {
            try {
                result = await mercadoPago.payment.get(parseInt(paymentIntent[i].transactionId));
            }
            catch (e) {
                console.log(e);
            }
            const isExpired = Boolean(new Date(result.body.date_of_expiration) < new Date());
            if (result.body.status === "pending" && isExpired) {
                console.log("expirou");
                const soldNumbers = await this.rifaRepository.loadById(paymentIntent[i].rifaId);
                const removedNumbers = soldNumbers.soldNumbers.filter((num) => !paymentIntent[i].numbers.includes(num));
                await this.rifaRepository.removeNumbers(paymentIntent[i].rifaId, removedNumbers);
                await this.paymentIntentRepository.updateStatus(paymentIntent[i].id, "expired");
            }
            if (result.body.status === "approved") {
                console.log("approved");
                await this.paymentIntentRepository.updateStatus(paymentIntent[i].id, "approved");
            }
        }
    }
}
exports.VerifyPaymentStatusService = VerifyPaymentStatusService;
//# sourceMappingURL=verify-payment-status-service.js.map