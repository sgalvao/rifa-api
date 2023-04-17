export default {
	port: process.env.PORT || 9000,
	jwtSecret: process.env.JWT_SECRET,
	host: process.env.HOST,
}

export const MERCADO_PAGO = {
	CLIENT_ID: process.env.MERCADO_PAGO_CLIENT_ID,
	CLIENT_SECRET: process.env.MERCADO_PAGO_CLIENT_SECRET,
}
