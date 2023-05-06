export default {
	port: process.env.PORT || 9000,
	jwtSecret: process.env.JWT_SECRET,
	pushUser: process.env.PUSHOVER_USER,
	pushOverToken: process.env.PUSHOVER_TOKEN,
}
