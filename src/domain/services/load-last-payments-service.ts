import { PaymentIntentRepository, UsersRepository } from "@/infra/repositories"

export class LoadLastPaymentsService {
	constructor(
		private readonly paymentIntentRepository: PaymentIntentRepository,
		private readonly usersRepository: UsersRepository
	) {}

	async load() {
		const result = []

		try {
			const lastPayment = await this.paymentIntentRepository.findLastFive()
			for await (const item of lastPayment.sales) {
				const user = await this.usersRepository.findById(item.ownerId)

				result.push({
					name: user.name,
					value: item.totalValue,
					date: item.createdAt,
				})
			}

			return result
		} catch (e) {
			console.log(e)
		}
	}
}
