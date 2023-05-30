/* eslint-disable @typescript-eslint/no-namespace */
import { AdminRepository } from "@/infra/repositories"
import { User } from "../entities"
import env from "@/config/env"
import { HashProvider, JwtProvider } from "@/infra/providers"

export class AdminAuthService {
	constructor(
		private readonly adminRepository: AdminRepository,
		private readonly jwtProvider: JwtProvider,
		private readonly hashProvider: HashProvider
	) {}

	async auth(params: AuthenticationService.Params) {
		const admin = await this.adminRepository.findByEmail(params.email)
		if (!admin) {
			throw new Error("Usuário não encontrado!")
		}

		const isValidPassword = await this.hashProvider.compareHash(params.password, admin.password)

		if (!isValidPassword) {
			throw new Error("Usuário ou senha invalida!")
		}

		const token = this.jwtProvider.encryptToken(admin.email, env.jwtSecret)

		return Object.assign(admin, { token })
	}
}

export namespace AuthenticationService {
	export type Params = {
		email: string
		password: string
	}
	export type Result = User
}
