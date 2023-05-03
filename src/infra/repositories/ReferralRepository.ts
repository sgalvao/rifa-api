import { prisma } from "@/config/prisma-client"
import { CreateAffiliatedService } from "@/domain/services/create-affiliated-service"

export class ReferralRepository {
	async create(params: CreateAffiliatedService.Params) {
		const referral = await prisma.referral.create({
			data: {
				name: params.name,
				userId: params.userId,
				balance: 0,
				pixKey: params.pixKey,
				isActive: true,
				hasWithdrawal: false,
				totalBalance: 0,
			},
		})

		return referral
	}

	async load(id) {
		try {
			const referral = await prisma.referral.findUnique({ where: { id } })
			return referral
		} catch (e) {
			return false
		}
	}

	async verify(id) {
		try {
			await prisma.referral.findUnique({ where: { id } })
			return true
		} catch (e) {
			return false
		}
	}

	async loadAll() {
		const referral = await prisma.referral.findMany()

		return referral
	}

	async delete(params) {
		const referral = await prisma.referral.delete(params)

		return referral
	}

	async withdrawal(params) {
		const referral = await prisma.referral.update({
			where: { id: params.id },
			data: {
				hasWithdrawal: false,
				lastPayment: new Date(),
				balance: 0,
			},
		})

		return referral
	}

	async createdBalance(params) {
		const referral = await prisma.referral.update({
			where: { id: params.id },
			data: {
				balance: params.value,
				totalBalance: params.total,
				hasWithdrawal: true,
			},
		})

		return referral
	}
}
