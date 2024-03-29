import { CreateRifaService, LoadRankingService, LoadRifaById, LoadRifas } from "@/domain/services"
import { CheckWinnerService } from "@/domain/services/check-winner"
import { PaymentIntentRepository, RifaRepository, UsersRepository, WinnersRepository } from "@/infra/repositories"

const makeCreateRifa = () => {
	const rifaRepository = new RifaRepository()
	const createRifaservice = new CreateRifaService(rifaRepository)

	return createRifaservice
}

const makeLoadRifa = () => {
	const rifaRepository = new RifaRepository()
	const loadRifaById = new LoadRifaById(rifaRepository)
	return loadRifaById
}

const makeLoadRifas = () => {
	const rifaRepository = new RifaRepository()
	const loadRifas = new LoadRifas(rifaRepository)
	return loadRifas
}

const makeCheckWinner = () => {
	const rifaRepository = new RifaRepository()
	const paymentIntentRepository = new PaymentIntentRepository()
	const usersRepository = new UsersRepository()
	const winnersRepository = new WinnersRepository()
	const checkWinner = new CheckWinnerService(
		paymentIntentRepository,
		rifaRepository,
		usersRepository,
		winnersRepository
	)
	return checkWinner
}

const makeLoadRanking = () => {
	const paymentRepository = new PaymentIntentRepository()
	const usersRepository = new UsersRepository()
	const loadRankingService = new LoadRankingService(paymentRepository, usersRepository)

	return loadRankingService
}

export default {
	Mutation: {
		createRifa: async (_, args) => {
			return makeCreateRifa().create({ ...args })
		},
		checkWinner: async (_, { rifaId, drawnNumber }, adminId) => {
			return makeCheckWinner().check(rifaId, drawnNumber)
		},
	},

	Query: {
		loadRifa: async (_, { rifaId }) => {
			return makeLoadRifa().load(rifaId)
		},
		loadRifas: async () => makeLoadRifas().load(),
		loadRanking: async (_, { rifaId }) => makeLoadRanking().load(rifaId),
	},
}
