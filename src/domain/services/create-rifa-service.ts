import { RifaRepository } from "@/infra/repositories"
import { Rifa } from "@/domain/entities"

export class CreateRifaService {
	constructor(private readonly rifaRepository: RifaRepository) {}

	async create(params: CreateRifaService.Params): Promise<CreateRifaService.Result> {
		const rifa = await this.rifaRepository.create(params)
		return rifa
	}
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateRifaService {
	export type Params = {
		name: string
		price: number
		authorId: string
		image: string
		description: string
	}

	export type Result = Rifa
}
