import { MercadoPagoProvider } from "@/infra/providers/mercado-pago"
import { RifaRepository, UsersRepository } from "@/infra/repositories"
import { PaymentIntentRepository } from "@/infra/repositories/PaymentIntentRepository"
import { PaymentIntent } from "../entities"
import { addMinutes } from "date-fns"
export class CreatePaymentService {
	constructor(
		private readonly rifaRepository: RifaRepository,
		private readonly userRepository: UsersRepository,
		private readonly paymentIntentRepository: PaymentIntentRepository,
		private readonly mercadoPagoProvider: MercadoPagoProvider
	) {}

	async create(params: CreatePaymentService.Params): Promise<CreatePaymentService.Result> {
		const list = []
		console.time("create payment service")

		const rifa = await this.rifaRepository.loadById(params.rifaId)
		const user = await this.userRepository.findById(params.ownerId)

		if (rifa.isFinished) {
			throw new Error("Ação ja foi finalizada!")
		}

		for (let i = 0; i < params.quantity; i++) {
			const number = Math.floor(Math.random() * 99999) + 1
			const isSold = Boolean(rifa.soldNumbers.includes(number) || list.includes(number))

			if (isSold) {
				i--
			} else {
				list.push(number)
			}
		}

		console.log()

		const mercadoPago = await this.mercadoPagoProvider.connect().payment.create({
			transaction_amount: Number((params.quantity * rifa.price).toFixed(2)),
			description: "E-Book Premios",
			payment_method_id: "pix",
			installments: 0,

			date_of_expiration: addMinutes(Date.now(), 10).toISOString(),
			payer: {
				email: user.email || "gamesmegapixel@gmail.com",
				first_name: user.name,
			},
		})
		console.log(
			"🚀 ~ file: create-payment.ts:53 ~ CreatePaymentService ~  params.quantity * rifa.price:",
			params.quantity * rifa.price
		)
		console.log("🚀 ~ file: create-payment.ts:53 ~ CreatePaymentService ~ mercadoPago:", mercadoPago)

		const paymentIntent = await this.paymentIntentRepository.create({
			transactionId: mercadoPago.response.id.toString(),
			numbers: list,
			ownerId: params.ownerId,
			rifaId: params.rifaId,
			quantity: params.quantity,
			copyPasteCode: mercadoPago.body.point_of_interaction.transaction_data.qr_code,
			qrCode: mercadoPago.body.point_of_interaction.transaction_data.qr_code,
			totalValue: params.quantity * rifa.price,
			value: rifa.price,
		})
		console.log("🚀 ~ file: create-payment.ts:70 ~ CreatePaymentService ~ paymentIntent:", paymentIntent)

		await this.rifaRepository.addSoldNumber(params.rifaId, list)
		console.timeEnd("create payment service")

		return paymentIntent
	}
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreatePaymentService {
	export type Params = {
		ownerId: string
		quantity: number
		rifaId: string
		qrCode: string
		copyPasteCode: string
		totalValue: number
		value: number
	}

	export type Result = PaymentIntent
}
