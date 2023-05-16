import { PaymentIntentRepository, UsersRepository } from "@/infra/repositories"
import { PartnerRepository } from "@/infra/repositories/PartnerRepository"

export class LoadPartnerRelatory {
	constructor(
		private readonly paymentIntent: PaymentIntentRepository,
		private readonly partnerRepository: PartnerRepository,
		private readonly usersRepository: UsersRepository
	) {}

	async load(id: string, offset: number) {
		const partner = await this.partnerRepository.findById(id)
		const results = await this.paymentIntent.findPartnerResults(partner.referralCode, offset)

		const relatory = []

		for await (const item of results) {
			const user = await this.usersRepository.findById(item.ownerId)

			relatory.push({
				name: user.name,
				value: item.totalValue,
				status: item.status,
				date: item.createdAt,
			})
		}

		return relatory
	}
}
