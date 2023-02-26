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
  async delete() {}
  async update() {}
  async reserveNumbers() {}
  async buyNumbers() {}
  async setWinner() {}
}
