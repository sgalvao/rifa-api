import { CreateAdminService } from "@/domain/services"
import { AdminAuthService } from "@/domain/services/admin-auth-service"
import { LoadLastPaymentsService } from "@/domain/services/load-last-payments-service"
import { LoadPartnersService } from "@/domain/services/load-partners-service"
import { LoadSalesAmountService } from "@/domain/services/load-sales-amount-service"
import { LoadSalesRelatoryService } from "@/domain/services/load-sales-relatory"
import { HashProvider, JwtProvider } from "@/infra/providers"
import { AdminRepository, PaymentIntentRepository, RifaRepository, UsersRepository } from "@/infra/repositories"
import { PartnerRepository } from "@/infra/repositories/PartnerRepository"

const makeAdminAuthentication = () => {
	const hashProvider = new HashProvider()
	const adminRepository = new AdminRepository()
	const jwtProvider = new JwtProvider()

	const authenticationService = new AdminAuthService(adminRepository, jwtProvider, hashProvider)
	return authenticationService
}

const makeCreateAdmin = () => {
	const hashProvider = new HashProvider()

	const adminRepository = new AdminRepository()
	const createAdminService = new CreateAdminService(adminRepository, hashProvider)

	return createAdminService
}

const makeLoadSalesAmount = () => {
	const paymentIntentRepository = new PaymentIntentRepository()
	const loadSalesAmountService = new LoadSalesAmountService(paymentIntentRepository)

	return loadSalesAmountService
}

const makeLoadLastPayments = () => {
	const paymentIntentRepository = new PaymentIntentRepository()
	const usersRepository = new UsersRepository()
	const loadLastPayments = new LoadLastPaymentsService(paymentIntentRepository, usersRepository)

	return loadLastPayments
}

const makeLoadSalesRelatory = () => {
	const paymentIntentRepository = new PaymentIntentRepository()
	const usersRepository = new UsersRepository()
	const loadSalesRelatoryService = new LoadSalesRelatoryService(paymentIntentRepository, usersRepository)

	return loadSalesRelatoryService
}

const makeLoadPartners = () => {
	const partnerRepository = new PartnerRepository()

	const loadPartnersService = new LoadPartnersService(partnerRepository)

	return loadPartnersService
}

export default {
	Query: {
		adminLogin: (_, args) => makeAdminAuthentication().auth(args),
		loadSalesAmount: (_, args) => makeLoadSalesAmount().load(),
		loadLastPayments: (_, args) => makeLoadLastPayments().load(),
		loadSalesRelatory: (_, { offset }) => makeLoadSalesRelatory().load(offset),
		loadPartners: (_, args) => makeLoadPartners().load(),
	},
	Mutation: {
		createAdmin: (_, { admin }) => makeCreateAdmin().create({ ...admin }),
	},
}
