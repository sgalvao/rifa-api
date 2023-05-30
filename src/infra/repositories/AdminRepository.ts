import { prisma } from "@/config/prisma-client"

export class AdminRepository {
	async findById(id: string) {
		const admin = await prisma.admin.findUnique({ where: { id } })

		return admin
	}

	async findByEmail(email: string) {
		const admin = await prisma.admin.findUnique({ where: { email } })

		return admin
	}

	async create(params) {
		const admin = await prisma.admin.create({ data: { ...params } })

		return admin
	}
}
