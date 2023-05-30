import { HashProvider } from "@/infra/providers"
import { AdminRepository } from "@/infra/repositories"

export class CreateAdminService {
	constructor(private readonly adminRepository: AdminRepository, private readonly hashProvider: HashProvider) {}

	async create(params) {
		const invalidEmail = await this.adminRepository.findByEmail(params.email)

		if (invalidEmail) {
			throw new Error("Email já cadastrado!")
		}

		const encryptedPassword = await this.hashProvider.createHash(params.password, 9)

		const admin = await this.adminRepository.create({ ...params, password: encryptedPassword })

		return admin
	}
}
