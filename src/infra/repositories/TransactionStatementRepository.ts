import { prisma } from "@/config/prisma-client"

export class TransactionStatementRepository {
	async create(params) {
		const transactionStatement = await prisma.transactionStatement.create({
			data: {
				partnerId: params.partnerId,
				value: params.value,
				transactionDate: new Date(),
				action: params.action,
			},
		})

		return transactionStatement
	}

	async loadById(id: string) {
		const transactionStatement = await prisma.transactionStatement.findMany({ where: { id } })
		return transactionStatement
	}

	async delete(id: string) {
		const transactionStatement = await prisma.transactionStatement.deleteMany({ where: { id } })

		return transactionStatement
	}

	async balanceById(id: string) {
		const balance = await prisma.transactionStatement.aggregateRaw({
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
