import { LoadPaymentById, LoadPurchasedNumbers, VerifyPaymentService } from "@/domain/services"
import { CreatePaymentService } from "@/domain/services/create-payment"
import { MercadoPagoProvider } from "@/infra/providers/mercado-pago"
import { PushOverProvider } from "@/infra/providers/pushover-provider"
import { RifaRepository, UsersRepository } from "@/infra/repositories"
import { PaymentIntentRepository } from "@/infra/repositories"

const makeCreatePayment = () => {
	const rifaRepository = new RifaRepository()
	const usersRepository = new UsersRepository()
	const paymentIntentRepository = new PaymentIntentRepository()
	const mercadoPagoProvider = new MercadoPagoProvider()
	const pushoverProvider = new PushOverProvider()
	const createPayment = new CreatePaymentService(
		rifaRepository,
		usersRepository,
		paymentIntentRepository,
		mercadoPagoProvider,
		pushoverProvider
	)

	return createPayment
}

const makeLoadPaymentById = () => {
	const paymentIntentRepository = new PaymentIntentRepository()
	const loadPaymentById = new LoadPaymentById(paymentIntentRepository)
	return loadPaymentById
}

const makeLoadPurchasedNumbers = () => {
	const paymentIntentRepository = new PaymentIntentRepository()
	const rifaRepository = new RifaRepository()
	const loadPurchasedNumbers = new LoadPurchasedNumbers(paymentIntentRepository, rifaRepository)
	return loadPurchasedNumbers
}

const makeVerifyPayment = () => {
	const paymentIntentRepository = new PaymentIntentRepository()
	const verifyPaymentService = new VerifyPaymentService(paymentIntentRepository)

	return verifyPaymentService
}

export default {
	Mutation: {
		createPayment: (_, args, { userId }) => {
			return makeCreatePayment().create({ ...args, ownerId: userId })
		},
	},
	Query: {
		loadPaymentById: (_, { id }) => makeLoadPaymentById().load(id),
		loadPurchasedNumbers: (_, args, { userId }) => makeLoadPurchasedNumbers().load(userId),
		verifyStatus: (_, { paymentId }) => {
			return makeVerifyPayment().verify(paymentId)
		},
	},
}
