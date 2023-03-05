"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyPaymentStatusService = void 0;
class VerifyPaymentStatusService {
    constructor(rifaRepository, paymentIntentRepository, mercadoPagoProvider) {
        this.rifaRepository = rifaRepository;
        this.paymentIntentRepository = paymentIntentRepository;
        this.mercadoPagoProvider = mercadoPagoProvider;
    }
    async verify(param) {
        console.log("🚀 ~ file: verify-payment-status-service.ts:12 ~ VerifyPaymentStatusService ~ verify ~ paymentId:", param.paymentId);
        const mercadoPago = this.mercadoPagoProvider.connect();
        const mercadoReturn = await mercadoPago.payment.get(1311857402);
        console.log(mercadoReturn);
        return mercadoReturn;
    }
}
exports.VerifyPaymentStatusService = VerifyPaymentStatusService;
//# sourceMappingURL=verify-payment-status-service.js.map