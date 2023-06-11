import { prisma } from "@/config/prisma-client"
import { CreatePaymentService } from "@/domain/services/create-payment"

interface CreateIntent extends CreatePaymentService.Params {
	numbers: number[]
	transactionId: string
	qrCode: string
	copyPasteCode: string
	value: number
	totalValue: number
}
export class PaymentIntentRepository {
	async create(params: CreateIntent) {
		console.time("Create payment")
		const reservedNumber = await prisma.paymentIntent.create({
			data: {
				ownerId: params.ownerId,
				rifaId: params.rifaId,
				transactionId: params.transactionId,
				quantity: params.quantity,
				numbers: params.numbers,
				status: "pending",
				totalValue: params.totalValue,
				qrCode: params.qrCode,
				copyPasteCode: params.copyPasteCode,
				value: params.value,
				referralCode: params.referralCode,
			},
		})

		console.timeEnd("Create payment")

		return reservedNumber
	}

	async remove(paymentId) {
		const reservedNumber = await prisma.paymentIntent.delete({
			where: { id: paymentId },
		})
		return reservedNumber
	}

	async verify() {
		console.time("EXECUCAO VERIFY")
		const paymentStatus = await prisma.paymentIntent.findMany({
			where: { status: "pending" },
		})

		console.timeEnd("EXECUCAO VERIFY")

		return paymentStatus
	}

	async updateStatus(id: string, status: string) {
		const paymentStatus = await prisma.paymentIntent.update({
			where: { id },
			data: { status },
		})

		return paymentStatus
	}

	async getById(id: string) {
		const payment = await prisma.paymentIntent.findUnique({ where: { id } })
		return payment
	}

	async verifyWinner(rifaId: string, drawnNumber: number) {
		const payment = await prisma.paymentIntent.findFirst({
			where: {
				AND: [{ rifaId }, { status: "approved" }, { numbers: { hasSome: [drawnNumber] } }],
			},
		})
		return payment
	}

	async isPayed(paymentId: string) {
		const payment = await prisma.paymentIntent.findUnique({ where: { id: paymentId } })

		if (payment.status === "approved") {
			return true
		}

		return false
	}

	async loadByOwnerId(ownerId: string) {
		const payment = await prisma.paymentIntent.findMany({
			where: {
				AND: [{ ownerId }, { status: "approved" }],
			},
		})

		return payment
	}

	async loadRanking(rifaId: string) {
		const ranking = await prisma.paymentIntent.aggregateRaw({
			pipeline: [
				{
					$match: {
						status: "approved",
						rifaId,
					},
				},
				{
					$group: { _id: "$ownerId", createdAt: { $min: "$createdAt" }, count: { $sum: "$quantity" } },
				},
				{
					$sort: { count: -1, createdAt: 1 },
				},
				{
					$limit: 3,
				},
			],
		})

		return ranking
	}

	async findByReferralId(referralId: string) {
		const sales = await prisma.paymentIntent.findMany({
			take: 5,
			orderBy: { createdAt: "desc" },
			where: { AND: [{ referralCode: referralId }, { status: "approved" }] },
		})

		const count = await prisma.paymentIntent.count({ where: { referralCode: referralId } })

		const result = {
			sales,
			count,
		}

		return result
	}

	async findLastFive() {
		const sales = await prisma.paymentIntent.findMany({
			take: 5,
			orderBy: { createdAt: "desc" },
			where: { status: "approved" },
		})

		const result = {
			sales,
		}

		return result
	}

	async findPartnerResults(referralId: string, offset: number) {
		const results = await prisma.paymentIntent.findMany({
			orderBy: { createdAt: "desc" },
			skip: offset,
			take: 10,
			where: { referralCode: referralId },
		})

		return results
	}

	async findAll() {
		const payments = await prisma.paymentIntent.findMany({ orderBy: { createdAt: "desc" } })

		return payments
	}

	async findAllFilter(offset = 0) {
		const payment = await prisma.paymentIntent.aggregateRaw({
			pipeline: [
				{
					$project: {
						_id: 0,
						value: { $toDouble: "$totalValue" },
						status: 1,
						ownerId: { $toObjectId: "$ownerId" },
						createdAt: 1,
					},
				},

				{
					$lookup: {
						from: "User",
						localField: "ownerId",
						foreignField: "_id",
						as: "owner",
					},
				},
				{
					$unwind: {
						path: "$owner",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$project: {
						value: 1,
						status: 1,
						name: "$owner.name",
						phone: "$owner.phone",
						date: { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$createdAt" } },
					},
				},
				{
					$sort: {
						date: -1,
					},
				},
				{
					$limit: 30,
				},
			],
		})

		return payment
	}
}
