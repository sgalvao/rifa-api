import { PartnerRepository } from "@/infra/repositories/PartnerRepository"

export class LoadPartnersService {
	constructor(private readonly partnersRepository: PartnerRepository) {}

	async load() {
		const partners = await this.partnersRepository.findAll()

		return partners
	}
}
