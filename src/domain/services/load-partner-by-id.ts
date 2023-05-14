import { PartnerRepository } from "@/infra/repositories/PartnerRepository"

export class LoadPartnerByIdService {
	constructor(private readonly partnerRepository: PartnerRepository) {}

	async load(id: string) {
		const partner = this.partnerRepository.findById(id)

		return partner
	}
}
