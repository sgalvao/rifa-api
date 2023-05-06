import { JwtProvider } from "@/infra/providers"
import env from "@/config/env"
import { PartnerRepository } from "@/infra/repositories/PartnerRepository"

export class LoadPartnerByTokenService {
	constructor(private readonly partnerRepository: PartnerRepository, private readonly jwtProvider: JwtProvider) {}

	async load(token: string) {
		const tokenDecrypted = this.jwtProvider.decryptToken(token, env.jwtSecret)

		if (tokenDecrypted) {
			const userEmail = tokenDecrypted["id"]
			const user = await this.partnerRepository.loadByEmail(userEmail)
			if (user) {
				return user
			}
		}
		return null
	}
}
