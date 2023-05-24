import { PaymentIntentRepository } from "@/infra/repositories"

export class VerifyPaymentService {
	constructor(private readonly paymentIntent: PaymentIntentRepository) {}

	async verify(paymentId: string) {
		const verify = await this.paymentIntent.isPayed(paymentId)

		return verify
	}
}
