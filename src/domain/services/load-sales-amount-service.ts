import { PaymentIntentRepository } from "@/infra/repositories"

export class LoadSalesAmountService {
	constructor(private readonly paymentIntentRepository: PaymentIntentRepository) {}

	async load() {
		console.time("salesAmount")
		const payments = await this.paymentIntentRepository.findAll()
		const payedPayments = payments.filter((payment) => payment.status === "approved")

		const totalValue = payedPayments.reduce((value, payment) => value + payment.totalValue, 0)
		const soldNumbers = payedPayments.reduce((value, soldNumbers) => value + soldNumbers.numbers.length, 0)

		const restNumber = 100000 - soldNumbers

		const result = {
			orders: payments.length,
			totalValue,
			soldNumbers,
			restNumber,
		}
		console.timeEnd("salesAmount")

		return result
	}
}
