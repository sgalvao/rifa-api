import { CreateRifaService } from "@/domain/services/create-rifa-service";
import { prisma } from "@/config/prisma-client";

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

  async finish(params) {
    const rifa = await prisma.rifa.update({
      where: { id: params.id },
      data: {
        status: "CLOSED",
        winnerNumber: params.winnerNumber,
      },
    });

    return rifa;
  }

  async verifyNumber(num: number, id: string) {
    const rifa = await prisma.rifa.findFirst({
      where: { id },
      select: { soldNumbers: true },
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
