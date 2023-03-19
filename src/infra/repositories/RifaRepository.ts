import { CreateRifaService } from "@/domain/services/create-rifa-service";
import { prisma } from "@/config/prisma-client";
import { CheckWinnerService } from "@/domain/services/check-winner";

export class RifaRepository {
  constructor() {}

  async create(
    params: CreateRifaService.Params
  ): Promise<CreateRifaService.Result> {
    const rifa = await prisma.rifa.create({
      data: {
        name: params.name,
        authorId: params.authorId,
        price: params.price,
        image: params.image,
        status: "OPEN",
        winnerNumber: null,
        participants: 0,
      },
    });

    return rifa;
  }

  async loadById(id: string): Promise<CreateRifaService.Result> {
    const rifa = await prisma.rifa.findUnique({ where: { id } });
    return rifa;
  }

  async loadAll(): Promise<CreateRifaService.Result[]> {
    const rifas = await prisma.rifa.findMany();
    return rifas;
  }

  async removeNumbers(rifaId: string, removedNumbers: number[]) {
    const rifa = await prisma.rifa.update({
      where: { id: rifaId },
      data: {
        soldNumbers: removedNumbers,
      },
    });
    return rifa;
  }

  async finish(params: CheckWinnerService.Params) {
    const rifa = await prisma.rifa.update({
      where: { id: params.rifaId },
      data: {
        status: "CLOSED",
        winnerNumber: params.drawnNumber,
        isFinished: true,
        winnerName: params.winnerName,
        winnerId: params.winnerId,
      },
    });

    return rifa;
  }

  async verifyNumber(num: number, id: string) {
    const rifa = await prisma.rifa.findFirst({
      where: {
        AND: [
          { id },
          { status: "approved" },
          { soldNumbers: { hasSome: [num] } },
        ],
      },
    });

    if (rifa.soldNumbers) {
      return Boolean(rifa.soldNumbers.find((el) => el === num));
    }

    return false;
  }

  async addSoldNumber(rifaId: string, numbers: number[]) {
    const soldNumbers = await prisma.rifa.findUnique({
      where: { id: rifaId },
    });

    const newNumbers = soldNumbers.soldNumbers.concat(numbers);

    return await prisma.rifa.update({
      where: { id: rifaId },
      data: {
        soldNumbers: newNumbers,
      },
    });
  }
}
