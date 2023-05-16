import { PartnerRepository } from "@/infra/repositories/PartnerRepository"
import { Partner } from "../entities/Partner"
import { HashProvider } from "@/infra/providers"
import { generateReferralCode } from "@/utils/generate-referral-code"

export class CreatePartnerService {
	constructor(private readonly partnerRepository: PartnerRepository, private readonly hashProvider: HashProvider) {}

	public async create(params: CreatePartnerService.Params): Promise<CreatePartnerService.Result> {
		const validateEmail = await this.partnerRepository.findByEmail(params.email)

		if (validateEmail) {
			throw new Error("Email já cadastrado!")
		}
		const passwordEncrypted = await this.hashProvider.createHash(params.password, 10)
		const referralCode: string = await generateReferralCode()
		return this.partnerRepository.create({
			...params,
			password: passwordEncrypted,
			referralCode,
		})
	}
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreatePartnerService {
	export type Params = {
		id: string
		name: string
		email: string
		phone: string
		pixCode: string
		password: string
		cpf: string
	}
	export type Result = Partner
}
