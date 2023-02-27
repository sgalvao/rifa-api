import { prisma } from "@/config/prisma-client";

export class NumberRepository {
  constructor() {}

  async addNumber(params) {
    const number = await prisma.numbers.create({
      data: {
        number: params.number,
        ownerId: params.ownerId,
        rifaId: params.rifaId,
      },
    });

    return number;
  }

  async findByRifaId(rifaId: string) {
    const number = await prisma.numbers.findUnique({ where: { id: rifaId } });

    return number;
  }
}
