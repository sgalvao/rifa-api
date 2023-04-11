import { PaymentIntentRepository } from "@/infra/repositories"

export class LoadPaymentById {
	constructor(private readonly paymentIntentRepository: PaymentIntentRepository) {}

	async load(id: string) {
		const payment = await this.paymentIntentRepository.getById(id)

		return payment
	}
}
