import { VerifyPaymentStatusService } from "@/domain/services"
import mercadoPago from "@/infra/providers/mercado-pago"
import { PaymentIntentRepository, RifaRepository } from "@/infra/repositories"
import { Express } from "express"

const makePaymentVerifyStatus = () => {
	const rifaRepository = new RifaRepository()
	const paymentIntentRepository = new PaymentIntentRepository()
	const verifyPaymentStatus = new VerifyPaymentStatusService(rifaRepository, paymentIntentRepository, mercadoPago)
	return verifyPaymentStatus
}

export const setupRoutes = (app: Express): void => {
	app.get("/api/payment_pix", (req, res) => {
		makePaymentVerifyStatus().verify()
		return res.send(200)
	})

	app.get("/api/oauth", async (req, res) => {
		const { code } = req.query

		if (!code) {
			console.error("code not provided")
		}

		const { access_token, refresh_token, expires_in } = await mercadoPago.getOauthTokens(code as string)
		mercadoPago.setTokens(access_token, refresh_token, new Date(expires_in))

		res.send()
	})
}
