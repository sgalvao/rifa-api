import { prisma } from "@/config/prisma-client";

export class WinnersRepository {
  constructor() {}

  async create(params) {
    const winner = await prisma.winners.create({
      data: {
        rifaId: params.rifaId,
        rifaImage: params.rifaImage,
        rifaName: params.rifaName,
        winnerId: params.winnerId,
        winnerName: params.winnerName,
        winnerNumber: params.winnerNumber,
      },
    });
    return winner;
  }

  async loadWinners() {
    const winners = await prisma.winners.findMany({
      orderBy: { createdAt: "desc" },
    });

    return winners;
  }
}
