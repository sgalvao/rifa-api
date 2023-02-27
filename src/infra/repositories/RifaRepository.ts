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

  async delete() {}
  async update() {}
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

    return Boolean(rifa.soldNumbers.find((el) => el === num));
  }

  async addSoldNumber(params) {
    const soldNumbers = await prisma.rifa.findUnique({
      where: { id: params.id },
    });

    const newNumbers = params.numbers.map((number) =>
      soldNumbers.soldNumbers.push(number)
    );

    return await prisma.rifa.update({
      where: { id: params.id },
      data: {
        soldNumbers: newNumbers,
      },
    });
  }
}
