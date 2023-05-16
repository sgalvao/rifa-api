import { TransactionStatementRepository } from "@/infra/repositories/TransactionStatementRepository"

export class LoadTransactionsService {
	constructor(private readonly transactionStatementRepository: TransactionStatementRepository) {}

	async load(partnerId: string) {
		const transactions = await this.transactionStatementRepository.loadById(partnerId)

		return transactions
	}
}
