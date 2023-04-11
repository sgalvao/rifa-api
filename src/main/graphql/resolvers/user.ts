import { CreateAccountService } from "@/domain/services"
import { AuthenticationService } from "@/domain/services/authentication"
import { LoadUserByIdService } from "@/domain/services/"
import { JwtProvider } from "@/infra/providers"
import { UsersRepository } from "@/infra/repositories/UserRepository"

const makeCreateAccount = () => {
	const userRepository = new UsersRepository()
	const createAccountService = new CreateAccountService(userRepository)

	return createAccountService
}

const makeLoadAccountById = () => {
	const userRepository = new UsersRepository()
	const loadAccountByIdService = new LoadUserByIdService(userRepository)
	return loadAccountByIdService
}

const makeAuthentication = () => {
	const userRepository = new UsersRepository()
	const jwtProvider = new JwtProvider()
	const authenticationService = new AuthenticationService(userRepository, jwtProvider)
	return authenticationService
}
export default {
	Query: {
		login: (_, args) => {
			return makeAuthentication().auth(args)
		},
		loadUser: (_, args, { userId }) => {
			return makeLoadAccountById().load(userId)
		},
	},
	Mutation: {
		createUser: async (_, { user }) => makeCreateAccount().create(user),
	},
}
