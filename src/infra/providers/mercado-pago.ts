import MercadoPago from "mercadopago"
import axios, { Axios } from "axios"

export class MercadoPagoProvider {
	axios: Axios = axios.create({
		baseURL: "https://api.mercadopago.com",
	})

	connect() {
		MercadoPago.configure({ access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN })
		return MercadoPago
	}
}
