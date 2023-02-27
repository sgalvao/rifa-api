import { RifaRepository } from "@/infra/repositories";

export class LoadRifas {
  constructor(private readonly rifaRepository: RifaRepository) {}

  async load() {
    const rifas = await this.rifaRepository.loadAll();

    return rifas;
  }
}
