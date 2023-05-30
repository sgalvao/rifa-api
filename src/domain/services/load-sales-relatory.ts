import { PaymentIntentRepository, UsersRepository } from "@/infra/repositories"

export class LoadSalesRelatoryService {
	constructor(
		private readonly paymentIntentRepository: PaymentIntentRepository,
		private readonly usersRepository: UsersRepository
	) {}

	async load(offset: number) {
		console.time("salesRelatory")
		const results = await this.paymentIntentRepository.findAllFilter(offset)
		const relatory = []
		for await (const item of results) {
			const user = await this.usersRepository.findById(item.ownerId)

			relatory.push({
				name: user.name,
				value: item.totalValue,
				status: item.status,
				date: item.createdAt,
				phone: user.phone,
			})
		}
		console.timeEnd("salesRelatory")
		return relatory
	}
}
