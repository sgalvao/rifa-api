import { VerifyPaymentStatusService } from "@/domain/services"
import { MercadoPagoProvider } from "@/infra/providers/mercado-pago"
import { PaymentIntentRepository, RifaRepository } from "@/infra/repositories"
import { CronJob } from "cron"
const makePaymentVerifyStatus = () => {
	const rifaRepository = new RifaRepository()
	const paymentIntentRepository = new PaymentIntentRepository()
	const mercadoPagoProvider = new MercadoPagoProvider()
	const verifyPaymentStatus = new VerifyPaymentStatusService(
		rifaRepository,
		paymentIntentRepository,
		mercadoPagoProvider
	)

	return verifyPaymentStatus
}

export const cronProvider = () => {
	console.log("Verificando Status")
	const job = new CronJob("*/2 * * * *", makePaymentVerifyStatus().verify())

	return job
}
