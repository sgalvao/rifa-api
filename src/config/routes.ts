import { VerifyPaymentStatusService } from "@/domain/services"
import { MercadoPagoProvider } from "@/infra/providers/mercado-pago"
import { PushOverProvider } from "@/infra/providers/pushover-provider"
import { PaymentIntentRepository, RifaRepository } from "@/infra/repositories"
import { ReferralRepository } from "@/infra/repositories/ReferralRepository"
import { handleUserList } from "@/utils/get-expired-payment-users"
import { Express } from "express"

const makePaymentVerifyStatus = () => {
	const rifaRepository = new RifaRepository()
	const paymentIntentRepository = new PaymentIntentRepository()
	const mercadoPagoProvider = new MercadoPagoProvider()
	const pushOverProvider = new PushOverProvider()
	const referralRepository = new ReferralRepository()
	const verifyPaymentStatus = new VerifyPaymentStatusService(
		rifaRepository,
		paymentIntentRepository,
		mercadoPagoProvider,
		pushOverProvider,
		referralRepository
	)

	return verifyPaymentStatus
}

export const setupRoutes = (app: Express): void => {
	app.get("/api/payment_pix", (req, res) => {
		makePaymentVerifyStatus().verify()
		return res.sendStatus(200)
	})

	app.get("/api/xpto", async (req, res) => {
		const userList = await handleUserList()

		if (!userList) {
			return res.status(400).send("nenhum pagamento expirado!")
		}

		return res.status(200).send(userList)
	})
}
