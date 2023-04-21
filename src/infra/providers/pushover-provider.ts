import Push from "pushover-notifications"
import env from "@/config/env"

export class PushOverProvider {
	connect() {
		const push = new Push({
			user: env.pushUser,
			token: env.pushOverToken,
		})
		return push
	}

	async send(value: number) {
		const push = this.connect()

		const msg = {
			message: `Pagamento Recebido ${value.toLocaleString("pt-BR", {
				style: "currency",
				currency: "BRL",
			})}`,
			title: "Novo pagamento!🤑",
			sound: "shopify",
			device: "iphone",
			priority: 1,
		}

		push.send(msg, (err, result) => {
			if (err) {
				throw new Error(err)
			}

			console.log(result)
		})
	}
}
