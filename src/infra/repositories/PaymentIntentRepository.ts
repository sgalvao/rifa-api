import { prisma } from "@/config/prisma-client";
import { CreatePaymentService } from "@/domain/services/create-payment";

interface CreateIntent extends CreatePaymentService.Params {
  numbers: number[];
  transactionId: string;
  qrCode: string;
  copyPasteCode: string;
  value: number;
  totalValue: number;
}
export class PaymentIntentRepository {
  constructor() {}

  async create(params: CreateIntent) {
    const reservedNumber = await prisma.paymentIntent.create({
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

    return reservedNumber;
  }

  async remove(paymentId) {
    const reservedNumber = await prisma.paymentIntent.delete({
      where: { id: paymentId },
    });
    return reservedNumber;
  }

  async verify() {
    const paymentStatus = await prisma.paymentIntent.findMany({
      where: { status: "pending" },
    });

    return paymentStatus;
  }

  async updateStatus(id: string, status: string) {
    const paymentStatus = await prisma.paymentIntent.update({
      where: { id },
      data: { status },
    });

    return paymentStatus;
  }

  async getById(id: string) {
    const payment = await prisma.paymentIntent.findUnique({ where: { id } });
    return payment;
  }

  async verifyWinner(rifaId: string, drawnNumber: number) {
    const payment = await prisma.paymentIntent.findFirst({
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
