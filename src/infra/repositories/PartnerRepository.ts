import { prisma } from "@/config/prisma-client"

export class PartnerRepository {
	async create(params) {
		const partner = await prisma.partner.create({
			data: {
				name: params.name,
				email: params.email,
				password: params.password,
				phone: params.phone,
				referralCode: params.referralCode,
				pixCode: params.pixCode,
				cpf: params.cpf,
			},
		})

		return partner
	}

	async delete(id: string) {
		const partner = await prisma.partner.delete({ where: { id } })
		return partner
	}

	async findById(id: string) {
		const partner = await prisma.partner.findUnique({ where: { id } })
		return partner
	}

	async findByEmail(email: string) {
		const partner = await prisma.partner.findUnique({ where: { email } })
		return partner
	}

	async findAll() {
		const partners = await prisma.partner.findMany()

		return partners
	}

	async update(params) {
		const partner = await prisma.partner.update({
			where: { id: params.id },
			data: { ...params },
		})

		return partner
	}

	async addBalance(params) {
		const partner = await prisma.partner.findUnique({ where: { referralCode: params.referralCode } })
		const balance = await prisma.partner.update({
			where: { referralCode: params.referralCode },
			data: {
				balance: partner.balance + params.balance,
				totalBalance: partner.totalBalance + params.balance,
			},
		})
		return balance
	}

	async withdrawal(id: string) {
		const partner = await prisma.partner.update({
			where: { id },
			data: {
				balance: 0,
			},
		})

		return partner
	}

	async checkReferralCode(referralCode: string) {
		const referral = await prisma.partner.findFirst({ where: { referralCode } })

		return !!referral
	}
}
