import { prisma } from "@/config/prisma-client";

export class PaymentIntentRepository {
  constructor() {}

  async create(params) {
    const reservedNumber = await prisma.paymentIntent.create({
      data: {
        ownerId: params.ownerId,
        rifaId: params.rifaId,
        transactionId: params.transactionId,
        createdAt: params.createdAt,
        numbers: params.numbers,
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

  async reservedNumbers(rifaId) {
    const reservedNumbers = await prisma.paymentIntent.findMany({
      where: { rifaId: rifaId },
    });
    return reservedNumbers;
  }
}
