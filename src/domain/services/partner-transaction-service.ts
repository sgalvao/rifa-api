import { TransactionStatementRepository } from "@/infra/repositories"
import { PartnerRepository } from "@/infra/repositories/PartnerRepository"

export class PartnerTransactionService {
	constructor(
		private readonly partnerRepository: PartnerRepository,
		private readonly withdrawalRepository: TransactionStatementRepository
	) {}

	async withdrawal(partnerId: string) {
		const partner = await this.partnerRepository.findById(partnerId)

		if (!partner) {
			throw new Error("Parceiro Inativo ou não encontrado")
		}

		const withdrawalValid = partner.balance

		if (withdrawalValid < 30) {
			throw new Error("Saldo insuficiente para saque")
		}

		await this.withdrawalRepository.create({
			partnerId: partnerId,
			value: partner.balance,
		})
		return await this.partnerRepository.update({ balance: 0 })
	}
}
