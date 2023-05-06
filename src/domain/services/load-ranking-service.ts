import { PaymentIntentRepository, UsersRepository } from "@/infra/repositories"

export class LoadRankingService {
	constructor(
		private readonly paymentIntentRepository: PaymentIntentRepository,
		private readonly usersRepository: UsersRepository
	) {}

	async load(rifaId: string) {
		const ranking = await this.paymentIntentRepository.loadRanking(rifaId)
		const parsed = JSON.parse(JSON.stringify(ranking))
		const podium = []
		if (ranking.length) {
			for await (const item of parsed) {
				const user = await this.usersRepository.findById(item._id)
				podium.push({ name: user.name, count: item.count })
			}
		}

		return podium
	}
}
