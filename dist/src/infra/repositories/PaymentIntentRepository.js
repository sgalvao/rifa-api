"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentIntentRepository = void 0;
const prisma_client_1 = require("@/config/prisma-client");
class PaymentIntentRepository {
    constructor() { }
    async create(params) {
        console.time("Create payment");
        const reservedNumber = await prisma_client_1.prisma.paymentIntent.create({
            data: {
                ownerId: params.ownerId,
                rifaId: params.rifaId,
                transactionId: params.transactionId,
                quantity: params.quantity,
                numbers: params.numbers,
                status: "pending",
                totalValue: params.totalValue,
                qrCode: params.qrCode,
                copyPasteCode: params.copyPasteCode,
                value: params.value,
            },
        });
        console.timeEnd("Create payment");
        return reservedNumber;
    }
    async remove(paymentId) {
        const reservedNumber = await prisma_client_1.prisma.paymentIntent.delete({
            where: { id: paymentId },
        });
        return reservedNumber;
    }
    async verify() {
        console.time("EXECUCAO VERIFY");
        const paymentStatus = await prisma_client_1.prisma.paymentIntent.findMany({
            where: { status: "pending" },
        });
        console.timeEnd("EXECUCAO VERIFY");
        return paymentStatus;
    }
    async updateStatus(id, status) {
        const paymentStatus = await prisma_client_1.prisma.paymentIntent.update({
            where: { id },
            data: { status },
        });
        return paymentStatus;
    }
    async getById(id) {
        const payment = await prisma_client_1.prisma.paymentIntent.findUnique({ where: { id } });
        return payment;
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
    async loadByOwnerId(ownerId) {
        const payment = await prisma_client_1.prisma.paymentIntent.findMany({
            where: {
                AND: [{ ownerId }, { status: "approved" }],
            },
        });
        return payment;
    }
}
exports.PaymentIntentRepository = PaymentIntentRepository;
//# sourceMappingURL=PaymentIntentRepository.js.map