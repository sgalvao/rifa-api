import { PaymentIntentRepository, UsersRepository } from "@/infra/repositories"
import { PartnerRepository } from "@/infra/repositories/PartnerRepository"

export class LoadPartnerSalesService {
	constructor(
		private readonly paymentIntentRepository: PaymentIntentRepository,
		private readonly partnerRepository: PartnerRepository,
		private readonly usersRepository: UsersRepository
	) {}
	async load(id: string) {
		const partner = await this.partnerRepository.findById(id)
		const result = []

		if (!partner) {
			throw new Error("Parceiro não encontrado")
		}

		const response = await this.paymentIntentRepository.findByReferralId(partner.referralCode)

		for await (const item of response.sales) {
			const user = await this.usersRepository.findById(item.ownerId)

			result.push({
				name: user.name,
				value: item.totalValue,
				date: item.createdAt,
			})
		}

		return {
			count: response.count,
			sales: result,
		}
	}
}
