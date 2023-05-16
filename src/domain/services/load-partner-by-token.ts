import { JwtProvider } from "@/infra/providers"
import env from "@/config/env"
import { PartnerRepository } from "@/infra/repositories/PartnerRepository"

export class LoadPartnerByTokenService {
	constructor(private readonly partnerRepository: PartnerRepository, private readonly jwtProvider: JwtProvider) {}

	async load(token: string) {
		const tokenDecrypted = await this.jwtProvider.decryptToken(token, env.jwtSecret)

		if (tokenDecrypted) {
			const partnerEmail = tokenDecrypted["id"]
			const partner = await this.partnerRepository.findByEmail(partnerEmail)

			if (partner) {
				return partner
			}
		}
		return null
	}
}
