import MercadoPago from "mercadopago"
import axios, { Axios } from "axios"
import env, { MERCADO_PAGO } from "@/config/env"

let instance: MercadoPagoProvider = null

type TokensResponse = {
	access_token: string
	refresh_token: string
	expires_in: string
}
interface IMercadoPagoProvider {
	getInstance: () => MercadoPagoProvider
	configure: (accessToken: string) => void
	getOauthTokens: (code: string) => Promise<TokensResponse>
	refreshTokens: (refreshToken: string) => Promise<TokensResponse>
	setTokens: (accessToken: string, refreshToken: string, expiresIn: Date) => void
}

export class MercadoPagoProvider implements IMercadoPagoProvider {
	private readonly axios: Axios
	private _refreshToken: string = null
	private expiresIn: Date = null

	constructor() {
		if (instance) {
			return instance
		}

		this.axios = axios.create({
			baseURL: "https://api.mercadopago.com",
		})
		instance = this.getInstance()
		return instance
	}

	readonly sdk: typeof MercadoPago = MercadoPago

	getInstance = () => {
		return this
	}

	configure(accessToken: string) {
		this.sdk.configure({
			access_token: accessToken,
		})
	}

	getOauthTokens = async (code: string) => {
		const { data } = await this.axios.post("/oauth/token", {
			client_secret: MERCADO_PAGO.CLIENT_SECRET,
			client_id: MERCADO_PAGO.CLIENT_ID,
			grant_type: "authorization_code",
			redirect_uri: `${env.host}/api/oauth`,
			code,
		})

		return data
	}

	refreshTokens = async (refreshToken: string) => {
		const { data } = await this.axios.post("/oauth/token", {
			client_secret: MERCADO_PAGO.CLIENT_SECRET,
			client_id: MERCADO_PAGO.CLIENT_ID,
			grant_type: "refresh_token",
			refresh_token: refreshToken,
		})

		return data
	}

	setTokens = async (accessToken: string, refreshToken: string, expiresIn: Date) => {
		this.sdk.configure({
			access_token: accessToken,
		})
		this._refreshToken = refreshToken
		this.expiresIn = expiresIn
	}
}

export default new MercadoPagoProvider()
