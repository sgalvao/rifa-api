import { JwtProvider } from "@/infra/providers"
import env from "@/config/env"
import { AdminRepository } from "@/infra/repositories"

export class LoadAdminByTokenService {
	constructor(private readonly adminRepository: AdminRepository, private readonly jwtProvider: JwtProvider) {}

	async load(token: string) {
		const tokenDecrypted = await this.jwtProvider.decryptToken(token, env.jwtSecret)

		if (tokenDecrypted) {
			const partnerEmail = tokenDecrypted["id"]
			const partner = await this.adminRepository.findByEmail(partnerEmail)

			if (partner) {
				return partner
			}
		}
		return null
	}
}
