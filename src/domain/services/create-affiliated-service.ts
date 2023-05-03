/* eslint-disable @typescript-eslint/no-namespace */
import { UsersRepository } from "@/infra/repositories"
import { ReferralRepository } from "@/infra/repositories/ReferralRepository"

export class CreateAffiliatedService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly referralRepository: ReferralRepository
	) {}

	async create(params: CreateAffiliatedService.Params) {
		const user = await this.usersRepository.findById(params.userId)
		if (!user || user.isAffiliated) {
			throw new Error("Affiliation error user not found or user is already affiliated")
		}
		const affiliated = await this.referralRepository.create({
			pixKey: params.pixKey,
			userId: params.userId,
			name: user.name,
		})

		return affiliated
	}
}

export namespace CreateAffiliatedService {
	export type Params = {
		userId: string
		pixKey: string
		name?: string
	}
}
