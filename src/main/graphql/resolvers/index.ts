import userResolver from "./user"
import paymentResolver from "./payments"
import rifaResolver from "./rifa"
import winnersResolver from "./winners"
import partnerResolver from "./partner"
import transactions from "./transactions"
import adminResolver from "./admin"
export default [
	userResolver,
	rifaResolver,
	paymentResolver,
	winnersResolver,
	partnerResolver,
	transactions,
	adminResolver,
]
