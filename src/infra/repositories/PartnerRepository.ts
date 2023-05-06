import { prisma } from "@/config/prisma-client"

export class PartnerRepository {
	async create(params) {
		const partner = await prisma.partner.create({
			data: {
				name: params.name,
				email: params.email,
				password: params.password,
				referralCode: params.referralCode,
			},
		})

		return partner
	}

	async delete(id: string) {
		const partner = await prisma.partner.delete({ where: { id } })
		return partner
	}

	async loadById(id: string) {
		const partner = await prisma.partner.findUnique({ where: { id } })
		return partner
	}

	async loadByEmail(email: string) {
		const partner = await prisma.partner.findUnique({ where: { email } })
		return partner
	}

	async loadAll() {
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
}
