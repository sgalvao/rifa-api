"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentIntentRepository = void 0;
const prisma_client_1 = require("@/config/prisma-client");
class PaymentIntentRepository {
    constructor() { }
    async create(params) {
        const reservedNumber = await prisma_client_1.prisma.paymentIntent.create({
            data: {
                ownerId: params.ownerId,
                rifaId: params.rifaId,
                transactionId: params.transactionId,
                quantity: params.quantity,
                numbers: params.numbers,
            },
        });
        return reservedNumber;
    }
    async remove(paymentId) {
        const reservedNumber = await prisma_client_1.prisma.paymentIntent.delete({
            where: { id: paymentId },
        });
        return reservedNumber;
    }
}
exports.PaymentIntentRepository = PaymentIntentRepository;
//# sourceMappingURL=PaymentIntentRepository.js.map