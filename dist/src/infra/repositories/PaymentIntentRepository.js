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
                status: "pending",
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
    async verify() {
        const paymentStatus = await prisma_client_1.prisma.paymentIntent.findMany({
            where: { status: "pending" },
        });
        return paymentStatus;
    }
    async updateStatus(id, status) {
        const paymentStatus = await prisma_client_1.prisma.paymentIntent.update({
            where: { id },
            data: { status },
        });
        return paymentStatus;
    }
    async verifyWinner(rifaId, drawnNumber) {
        const payment = await prisma_client_1.prisma.paymentIntent.findFirst({
            where: {
                AND: [
                    { rifaId },
                    { status: "approved" },
                    { numbers: { hasSome: [drawnNumber] } },
                ],
            },
        });
        return payment;
    }
}
exports.PaymentIntentRepository = PaymentIntentRepository;
//# sourceMappingURL=PaymentIntentRepository.js.map