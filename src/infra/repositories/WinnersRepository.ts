import { prisma } from "@/config/prisma-client"

export class WinnersRepository {
	async create(params) {
		const winner = await prisma.winners.create({
			data: {
				rifaId: params.rifaId,
				rifaImage: params.rifaImage,
				rifaName: params.rifaName,
				winnerId: params.winnerId,
				winnerName: params.winnerName,
				winnerNumber: params.winnerNumber,
				paymentId: params.paymentId,
				date: params.date,
				phone: params.phone,
				quantityNumbers: params.quantityNumbers,
				numbers: params.numbers,
			},
		})
		return winner
	}

	async loadWinners() {
		const winners = await prisma.winners.findMany({
			orderBy: { createdAt: "desc" },
		})

		return winners
	}
}
