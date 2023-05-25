import { prisma } from "@/config/prisma-client"

export const handleUserList = async () => {
	const usersList = []
	const paymentsExpired = await prisma.paymentIntent.findMany({
		where: { status: "expired" },
		orderBy: [{ createdAt: "desc" }],
		take: 10,
	})

	for (let i = 0; i < paymentsExpired.length; i++) {
		const user = await prisma.user.findUnique({ where: { id: paymentsExpired[i].ownerId } })

		usersList.push({ name: user.name, phone: user.phone })
	}

	return usersList
}
