import { PaymentIntentRepository, RifaRepository, UsersRepository, WinnersRepository } from "@/infra/repositories"

export class CheckWinnerService {
	constructor(
		private readonly paymentIntentRepository: PaymentIntentRepository,
		private readonly rifaRepository: RifaRepository,
		private readonly usersRepository: UsersRepository,
		private readonly winnersRepository: WinnersRepository
	) {}

	async check(rifaId: string, drawnNumber: number) {
		const rifa = await this.rifaRepository.loadById(rifaId)

		if (rifa.isFinished) {
			throw new Error("Rifa já foi finalizada!")
		}

		if (rifa.soldNumbers) {
			const isSold = Boolean(rifa.soldNumbers.find((el) => el === drawnNumber))

			if (!isSold) {
				throw new Error("Número não pago")
			}

			const payment = await this.paymentIntentRepository.verifyWinner(rifaId, drawnNumber)

			if (!payment) {
				throw new Error("Numero não pago!")
			}

			const user = await this.usersRepository.findById(payment.ownerId)

			const rifaWinner = await this.rifaRepository.finish({
				rifaId,
				drawnNumber,
				winnerId: user.id,
				winnerName: user.name,
			})

			const winnerParams = {
				rifaId: rifaWinner.id,
				rifaImage: rifaWinner.image,
				rifaName: rifaWinner.name,
				winnerId: rifaWinner.winnerId,
				winnerName: rifaWinner.winnerName,
				winnerNumber: rifaWinner.winnerNumber,
				paymentId: payment.id,
				date: payment.createdAt,
				phone: user.phone,
				quantityNumbers: payment.numbers.length,
				numbers: payment.numbers,
			}

			const createWinner = await this.winnersRepository.create(winnerParams)

			return createWinner
		}
		throw new Error("Nenhum numero foi vendido!")
	}
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CheckWinnerService {
	export type Params = {
		rifaId: string
		drawnNumber: number
		winnerName: string
		winnerId: string
	}
}
