import { RifaRepository } from "@/infra/repositories";

export class LoadRifaById {
  constructor(private readonly rifaRepository: RifaRepository) {}

  async load(id: string) {
    const rifa = await this.rifaRepository.loadById(id);
    console.log(id);
    return rifa;
  }
}
