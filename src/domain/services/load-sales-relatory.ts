import { PaymentIntentRepository, UsersRepository } from "@/infra/repositories"

export class LoadSalesRelatoryService {
	constructor(
		private readonly paymentIntentRepository: PaymentIntentRepository,
		private readonly usersRepository: UsersRepository
	) {}

	async load(offset: number) {
		console.time("salesRelatory")
		const results = await this.paymentIntentRepository.findAllFilter(offset)

		console.timeEnd("salesRelatory")
		return results
	}
}
