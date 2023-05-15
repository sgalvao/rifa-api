import { CreatePartnerService, LoadPartnerByIdService, PartnerAuthService } from "@/domain/services"
import { LoadPartnerRelatory } from "@/domain/services/load-partner-relatory"
import { LoadPartnerSalesService } from "@/domain/services/load-partner-sales"
import { HashProvider, JwtProvider } from "@/infra/providers"
import { PaymentIntentRepository, UsersRepository } from "@/infra/repositories"
import { PartnerRepository } from "@/infra/repositories/PartnerRepository"

const makePartnerCreateAccount = () => {
	const partnerRepository = new PartnerRepository()
	const hashProvider = new HashProvider()
	const createAccountService = new CreatePartnerService(partnerRepository, hashProvider)

	return createAccountService
}

const makePartnerLoadAccountById = () => {
	const partnerRepository = new PartnerRepository()
	const loadAccountByIdService = new LoadPartnerByIdService(partnerRepository)
	return loadAccountByIdService
}

const makePartnerAuthentication = () => {
	const hashProvider = new HashProvider()
	const partnerRepository = new PartnerRepository()
	const jwtProvider = new JwtProvider()

	const authenticationService = new PartnerAuthService(hashProvider, partnerRepository, jwtProvider)
	return authenticationService
}

const makeLoadPartnerSales = () => {
	const partnerRepository = new PartnerRepository()
	const paymentIntentRepository = new PaymentIntentRepository()
	const usersRepository = new UsersRepository()
	const loadPartnerSales = new LoadPartnerSalesService(paymentIntentRepository, partnerRepository, usersRepository)

	return loadPartnerSales
}

const makeLoadPartnerRelatory = () => {
	const partnerRepository = new PartnerRepository()
	const paymentIntentRepository = new PaymentIntentRepository()
	const usersRepository = new UsersRepository()
	const loadPartnerRelatory = new LoadPartnerRelatory(paymentIntentRepository, partnerRepository, usersRepository)

	return loadPartnerRelatory
}

export default {
	Query: {
		loginPartner: (_, args) => {
			console.log(args)
			return makePartnerAuthentication().auth(args)
		},
		loadPartner: (_, args, { partnerId }) => {
			return makePartnerLoadAccountById().load(partnerId)
		},
		loadPartnerSales: (_, args, { partnerId }) => makeLoadPartnerSales().load(partnerId),
		loadPartnerRelatory: (_, args, { partnerId }) => makeLoadPartnerRelatory().load(partnerId),
	},
	Mutation: {
		createPartner: async (_, { user }) => {
			return makePartnerCreateAccount().create(user)
		},
	},
}
