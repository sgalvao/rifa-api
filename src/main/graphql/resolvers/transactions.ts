import { LoadTransactionsService } from "@/domain/services/load-transactions-service"
import { TransactionStatementRepository } from "@/infra/repositories"

const makeLoadTransactions = () => {
	const transactionsRepository = new TransactionStatementRepository()

	const loadTransactionsService = new LoadTransactionsService(transactionsRepository)

	return loadTransactionsService
}

export default {
	Mutation: {},
	Query: {
		loadTransactions: async (_, args, { partnerId }) => makeLoadTransactions().load(partnerId),
	},
}
