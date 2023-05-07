import { CreatePartnerService, LoadPartnerByIdService, PartnerAuthService } from "@/domain/services"
import { HashProvider, JwtProvider } from "@/infra/providers"
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
export default {
	Query: {
		loginPartner: (_, args) => {
			return makePartnerAuthentication().auth(args)
		},
		loadPartner: (_, args, { partnerId }) => {
			return makePartnerLoadAccountById().load(partnerId)
		},
	},
	Mutation: {
		createPartner: async (_, { user }) => {
			return makePartnerCreateAccount().create(user)
		},
	},
}
