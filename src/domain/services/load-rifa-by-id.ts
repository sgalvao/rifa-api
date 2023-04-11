import { RifaRepository } from "@/infra/repositories"

export class LoadRifaById {
	constructor(private readonly rifaRepository: RifaRepository) {}

	async load(id: string) {
		const rifa = await this.rifaRepository.loadById(id)
		return rifa
	}
}
