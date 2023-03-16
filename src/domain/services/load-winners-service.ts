import { WinnersRepository } from "@/infra/repositories";

export class LoadWinners {
  constructor(private readonly winnersRepository: WinnersRepository) {}

  async load() {
    const winners = await this.winnersRepository.loadWinners();

    return winners;
  }
}
