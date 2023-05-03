import { MercadoPagoProvider } from "@/infra/providers/mercado-pago"
import { PushOverProvider } from "@/infra/providers/pushover-provider"
import { PaymentIntentRepository, RifaRepository } from "@/infra/repositories"
import { ReferralRepository } from "@/infra/repositories/ReferralRepository"
export class VerifyPaymentStatusService {
	constructor(
		private readonly rifaRepository: RifaRepository,
		private readonly paymentIntentRepository: PaymentIntentRepository,
		private readonly mercadoPagoProvider: MercadoPagoProvider,
		private readonly pushoverProvider: PushOverProvider,
		private readonly referralRepository: ReferralRepository
	) {}

	async verify() {
		const paymentIntent = await this.paymentIntentRepository.verify()
		const mercadoPago = this.mercadoPagoProvider.connect()
		let isValidReferral

		if (!paymentIntent) return
		let result
		for (let i = 0; i < paymentIntent.length; i++) {
			try {
				result = await mercadoPago.payment.get(parseInt(paymentIntent[i].transactionId))
			} catch (e) {
				console.log(e)
			}

			const isExpired = Boolean(new Date(result.body.date_of_expiration) < new Date())
			if (paymentIntent[i].referralId) {
				isValidReferral = await this.referralRepository.load(paymentIntent[i].referralId)
			}

			if (result.body.status === "pending" && isExpired) {
				const soldNumbers = await this.rifaRepository.loadById(paymentIntent[i].rifaId)
				const removedNumbers = soldNumbers.soldNumbers.filter((num) => !paymentIntent[i].numbers.includes(num))
				await this.rifaRepository.removeNumbers(paymentIntent[i].rifaId, removedNumbers)

				await this.paymentIntentRepository.updateStatus(paymentIntent[i].id, "expired")
			}

			if (result.body.status === "approved") {
				console.log("approved")
				const payment = await this.paymentIntentRepository.updateStatus(paymentIntent[i].id, "approved")
				console.log("Passei e sem quebrar")

				if (isValidReferral) {
					console.log("Entrei aqui pra validar")
					await this.referralRepository.createdBalance({
						balance: payment.totalValue * 0.3 + isValidReferral.balance,
						id: isValidReferral.id,
						totalBalance: payment.totalValue * 0.3 + isValidReferral.totalBalance,
					})
				}

				await this.pushoverProvider.send({
					message: `Pagamento Recebido ${payment.totalValue.toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
					})}`,
					title: "Novo Pagamento!🤑",
				})
			}
		}
	}
}
