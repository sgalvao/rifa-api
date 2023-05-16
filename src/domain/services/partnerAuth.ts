/* eslint-disable @typescript-eslint/no-namespace */
import { HashProvider, JwtProvider } from "@/infra/providers"
import env from "@/config/env"
import { PartnerRepository } from "@/infra/repositories/PartnerRepository"
import { Partner } from "../entities/Partner"

export class PartnerAuthService {
	constructor(
		private readonly hashProvider: HashProvider,
		private readonly partnerRepository: PartnerRepository,
		private readonly jwtProvider: JwtProvider
	) {}

	async auth(params: PartnerAuthService.Params): Promise<PartnerAuthService.Result> {
		const user = await this.partnerRepository.findByEmail(params.email)

		if (!user) {
			throw new Error("Usuário ou senha invalida!")
		}

		const isValidPassword = await this.hashProvider.compareHash(params.password, user.password)

		if (!isValidPassword) {
			throw new Error("Usuário ou senha invalida!")
		}

		const token = await this.jwtProvider.encryptToken(user.email, env.jwtSecret)
		return Object.assign(user, { token })
	}
}

export namespace PartnerAuthService {
	export type Params = {
		email: string
		password: string
	}
	export type Result = Partner
}
