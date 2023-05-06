import { prisma } from "@/config/prisma-client"

export class WithdrawalRepository {
	async create(params) {
		const withdrawal = await prisma.withdrawal.create({
			data: {
				partnerId: params.partnerId,
				value: params.value,
				withdrawalDate: new Date(),
				action: params.action,
			},
		})

		return withdrawal
	}

	async loadById(id: string) {
		const withdrawal = await prisma.withdrawal.findMany({ where: { id } })
		return withdrawal
	}

	async delete(id: string) {
		const withdrawal = await prisma.withdrawal.deleteMany({ where: { id } })

		return withdrawal
	}

	async balanceById(id: string) {
		const balance = await prisma.withdrawal.aggregateRaw({
			pipeline: [
				{
					$match: { id },
				},
				{
					$group: {},
				},
			],
		})
	}
}
